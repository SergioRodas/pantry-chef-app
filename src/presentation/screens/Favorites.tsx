import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native';
import { PressableStateCallbackType } from 'react-native';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useColorScheme } from '../hooks/useColorScheme';
import { useFavoritesStore } from '../stores/useFavoritesStore';
import { theme } from '../styles/theme';
import { createWebStyles } from '../utils/platformStyles';

type PressableStateWithHover = PressableStateCallbackType & {
    hovered?: boolean;
};

export function Favorites() {
    const { favorites, clearFavorites } = useFavoritesStore();
    const colorScheme = useColorScheme() as 'light' | 'dark';

    if (favorites.length === 0) {
        return (
            <ThemedView style={styles(colorScheme).container}>
                <View style={styles(colorScheme).emptyContainer}>
                    <FontAwesome 
                        name="heart-o" 
                        size={64} 
                        color={theme.colors[colorScheme].primary} 
                        style={styles(colorScheme).icon}
                    />
                    <ThemedText style={styles(colorScheme).title}>
                        No Favorite Recipes Yet
                    </ThemedText>
                    <ThemedText style={styles(colorScheme).subtitle}>
                        Start adding recipes to your favorites!
                    </ThemedText>
                </View>
            </ThemedView>
        );
    }

    return (
        <ThemedView style={styles(colorScheme).container}>
            <View style={styles(colorScheme).header}>
                <ThemedText style={styles(colorScheme).title}>
                    My Favorite Recipes
                </ThemedText>
                <Pressable
                    style={({ pressed, hovered }: PressableStateWithHover) => [
                        styles(colorScheme).clearButton,
                        pressed && styles(colorScheme).buttonPressed,
                        hovered && styles(colorScheme).buttonHovered,
                    ]}
                    onPress={clearFavorites}
                >
                    <ThemedText style={styles(colorScheme).clearButtonText}>
                        Clear All
                    </ThemedText>
                </Pressable>
            </View>
            
            <FlatList
                data={favorites}
                renderItem={({ item }) => (
                    <Pressable
                        style={({ pressed, hovered }: PressableStateWithHover) => [
                            styles(colorScheme).mealItem,
                            pressed && styles(colorScheme).mealItemPressed,
                            hovered && styles(colorScheme).mealItemHovered,
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
                )}
                keyExtractor={(item) => item.id}
                style={styles(colorScheme).list}
            />
        </ThemedView>
    );
}

const styles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors[colorScheme].background,
        paddingTop: theme.spacing.xl,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.lg,
    },
    icon: {
        marginBottom: theme.spacing.lg,
        textAlign: 'center',
    },
    title: {
        ...theme.typography.title,
        color: theme.colors[colorScheme].primary,
        marginBottom: 0,
        flex: 1,
    },
    subtitle: {
        ...theme.typography.subtitle,
        color: theme.colors[colorScheme].secondary,
        textAlign: 'center',
    },
    list: {
        flex: 1,
        paddingHorizontal: theme.spacing.lg,
    },
    mealItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors[colorScheme].surface,
        borderRadius: theme.radius.md,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        ...theme.shadows.default,
    },
    mealItemPressed: {
        opacity: 0.7,
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
        paddingHorizontal: theme.spacing.lg,
        width: '100%',
    },
    clearButton: {
        backgroundColor: theme.colors[colorScheme].primary,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.radius.md,
        minWidth: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: theme.spacing.md,
        ...createWebStyles({
            cursor: 'pointer',
            transition: 'all 0.2s ease',
        }),
    },
    clearButtonText: {
        color: '#FFFFFF',
        ...theme.typography.button,
        textAlign: 'center',
    },
    buttonPressed: {
        opacity: 0.7,
    },
    buttonHovered: {
        transform: [{ scale: 1.05 }],
    },
    mealItemHovered: {
        transform: [{ translateY: -2 }],
        backgroundColor: colorScheme === 'light' 
            ? 'rgba(0, 0, 0, 0.05)'
            : 'rgba(255, 255, 255, 0.05)',
    },
}); 