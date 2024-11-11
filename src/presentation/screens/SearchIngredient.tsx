import { Ingredient } from '@/domain/entities';
import { ThemedText } from '@/presentation/components/ThemedText';
import { ThemedView } from '@/presentation/components/ThemedView';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useColorScheme } from '../hooks/useColorScheme';
import { useSearchIngredient } from '../hooks/useSearchIngredient';
import { theme } from '../styles/theme';

export function SearchIngredient() {
    const [searchText, setSearchText] = useState('');
    const colorScheme = useColorScheme() as 'light' | 'dark';
    const colors = theme.colors[colorScheme];
    const { isLoading, searchResults, error, searchIngredients } = useSearchIngredient();

    const handleSearchChange = (text: string) => {
        setSearchText(text);
        searchIngredients(text);
    };

    const handleSelectIngredient = (ingredient: Ingredient) => {
        setSearchText(ingredient.name);
        // Aquí puedes agregar lógica adicional
    };

    const renderItem = ({ item }: { item: Ingredient }) => (
        <Pressable
            style={styles(colorScheme).suggestionItem}
            onPress={() => handleSelectIngredient(item)}
        >
            <ThemedText>{item.name}</ThemedText>
            {item.type && (
                <ThemedText style={styles(colorScheme).suggestionType}>
                    {item.type}
                </ThemedText>
            )}
        </Pressable>
    );

    return (
        <ThemedView style={styles(colorScheme).container}>
            <View style={styles(colorScheme).header}>
                <ThemedText style={styles(colorScheme).title}>Pantry Chef</ThemedText>
                <ThemedText style={styles(colorScheme).subtitle}>
                    Find recipes with your ingredients
                </ThemedText>
            </View>

            <View style={styles(colorScheme).searchContainer}>
                <TextInput
                    style={styles(colorScheme).input}
                    placeholder="Enter an ingredient..."
                    placeholderTextColor={colors.placeholder}
                    value={searchText}
                    onChangeText={handleSearchChange}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>

            {searchText.length > 0 && (
                <FlatList
                    data={searchResults}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    style={styles(colorScheme).suggestionsList}
                    ListEmptyComponent={
                        <ThemedText style={styles(colorScheme).emptyText}>
                            No ingredients found
                        </ThemedText>
                    }
                />
            )}
        </ThemedView>
    );
}

const styles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.md,
        backgroundColor: theme.colors[colorScheme].background,
    },
    header: {
        marginTop: theme.spacing.xl,
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
    },
    title: {
        ...theme.typography.title,
        color: theme.colors[colorScheme].primary,
        marginBottom: theme.spacing.sm,
    },
    subtitle: {
        ...theme.typography.subtitle,
        color: theme.colors[colorScheme].secondary,
        textAlign: 'center',
    },
    searchContainer: {
        backgroundColor: theme.colors[colorScheme].surface,
        borderRadius: theme.radius.md,
        padding: theme.spacing.xs,
        ...theme.shadows.default
    },
    input: {
        height: 50,
        paddingHorizontal: theme.spacing.md,
        ...theme.typography.input,
        color: theme.colors[colorScheme].text,
    },
    suggestionsList: {
        maxHeight: 200,
        backgroundColor: theme.colors[colorScheme].surface,
        borderRadius: theme.radius.md,
        marginTop: theme.spacing.xs,
        borderWidth: 1,
        borderColor: theme.colors[colorScheme].border,
    },
    suggestionItem: {
        padding: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors[colorScheme].border,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    suggestionType: {
        fontSize: 12,
        color: theme.colors[colorScheme].secondary,
    },
    emptyText: {
        padding: theme.spacing.md,
        textAlign: 'center',
        color: theme.colors[colorScheme].secondary,
    },
}); 