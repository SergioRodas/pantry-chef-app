import { Ingredient, Meal } from '@/domain/entities';
import { ThemedText } from '@/presentation/components/ThemedText';
import { ThemedView } from '@/presentation/components/ThemedView';
import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { PressableStateCallbackType } from 'react-native';
import { useColorScheme } from '../hooks/useColorScheme';
import { useSearchIngredient } from '../hooks/useSearchIngredient';
import { theme } from '../styles/theme';
import { createWebStyles } from '../utils/platformStyles';

type PressableStateWithHover = PressableStateCallbackType & {
    hovered?: boolean;
};

export function SearchIngredient() {
    const [searchText, setSearchText] = useState('');
    const colorScheme = useColorScheme() as 'light' | 'dark';
    const colors = theme.colors[colorScheme];
    const { 
        isLoading, 
        searchResults, 
        error, 
        meals,
        selectedIngredient,
        searchIngredients,
        selectIngredient,
        clearSelection 
    } = useSearchIngredient();

    const handleSearchChange = (text: string) => {
        if (!selectedIngredient) {
            setSearchText(text);
            searchIngredients(text);
        }
    };

    const handleSelectIngredient = async (ingredient: Ingredient) => {
        setSearchText(ingredient.name);
        await selectIngredient(ingredient);
    };

    const handleClearSelection = () => {
        setSearchText('');
        clearSelection();
    };

    const renderIngredient = ({ item }: { item: Ingredient }) => (
        <Pressable
            style={({ hovered }: PressableStateWithHover) => [
                styles(colorScheme).suggestionItem,
                hovered && styles(colorScheme).suggestionItemHovered
            ]}
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

    const renderMeal = ({ item }: { item: Meal }) => (
        <Pressable
            style={({ hovered }: PressableStateWithHover) => [
                styles(colorScheme).mealItem,
                hovered && styles(colorScheme).mealItemHovered
            ]}
            onPress={() => router.push(`/meal/${item.id}`)}
        >
            <Image 
                source={{ uri: item.thumbnail }} 
                style={styles(colorScheme).mealImage}
            />
            <ThemedText style={styles(colorScheme).mealTitle}>
                {item.name}
            </ThemedText>
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
                    style={[
                        styles(colorScheme).input,
                        selectedIngredient && styles(colorScheme).inputDisabled
                    ]}
                    placeholder="Enter an ingredient..."
                    placeholderTextColor={colors.placeholder}
                    value={searchText}
                    onChangeText={handleSearchChange}
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!selectedIngredient}
                />
                {selectedIngredient && (
                    <Pressable 
                        onPress={handleClearSelection}
                        style={styles(colorScheme).clearButton}
                    >
                        <ThemedText style={styles(colorScheme).clearButtonText}>
                            ✕
                        </ThemedText>
                    </Pressable>
                )}
            </View>

            {isLoading && (
                <ActivityIndicator 
                    color={colors.primary} 
                    style={styles(colorScheme).loader}
                />
            )}

            {error && (
                <ThemedText style={styles(colorScheme).error}>
                    {error}
                </ThemedText>
            )}

            {!selectedIngredient && searchText.length > 0 && searchResults.length > 0 && (
                <FlatList
                    data={searchResults}
                    renderItem={renderIngredient}
                    keyExtractor={(item) => item.id}
                    style={styles(colorScheme).suggestionsList}
                />
            )}

            {meals.length > 0 && (
                <FlatList
                    data={meals}
                    renderItem={renderMeal}
                    keyExtractor={(item) => item.id}
                    style={styles(colorScheme).mealsList}
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
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors[colorScheme].surface,
        borderRadius: theme.radius.md,
        padding: theme.spacing.xs,
        ...theme.shadows.default
    },
    input: {
        flex: 1,
        height: 50,
        paddingHorizontal: theme.spacing.md,
        ...theme.typography.input,
        color: theme.colors[colorScheme].text,
    },
    inputDisabled: {
        opacity: 0.7,
    },
    clearButton: {
        padding: theme.spacing.sm,
        marginLeft: theme.spacing.xs,
    },
    clearButtonText: {
        fontSize: 18,
        color: theme.colors[colorScheme].secondary,
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
        backgroundColor: theme.colors[colorScheme].surface,
        ...createWebStyles({
            transition: 'background-color 0.2s ease',
            cursor: 'pointer',
        })
    },
    suggestionItemHovered: {
        backgroundColor: colorScheme === 'light' 
            ? 'rgba(0, 0, 0, 0.05)'
            : 'rgba(255, 255, 255, 0.05)',
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
    loader: {
        marginTop: theme.spacing.md,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: theme.spacing.md,
    },
    mealsList: {
        marginTop: theme.spacing.md,
    },
    mealItem: {
        padding: theme.spacing.md,
        backgroundColor: theme.colors[colorScheme].surface,
        borderRadius: theme.radius.md,
        marginBottom: theme.spacing.sm,
        flexDirection: 'row',
        alignItems: 'center',
        ...theme.shadows.default,
        ...createWebStyles({
            transition: 'transform 0.2s ease, background-color 0.2s ease',
            cursor: 'pointer',
        })
    },
    mealItemHovered: {
        backgroundColor: colorScheme === 'light' 
            ? 'rgba(0, 0, 0, 0.05)'
            : 'rgba(255, 255, 255, 0.05)',
        transform: [{
            translateY: -2 // Sutil efecto de elevación al hacer hover
        }]
    },
    mealImage: {
        width: 60,
        height: 60,
        borderRadius: theme.radius.sm,
        marginRight: theme.spacing.md,
    },
    mealTitle: {
        ...theme.typography.subtitle,
        color: theme.colors[colorScheme].primary,
        flex: 1,
    },
    mealDescription: {
        fontSize: 14,
        color: theme.colors[colorScheme].secondary,
    },
}); 