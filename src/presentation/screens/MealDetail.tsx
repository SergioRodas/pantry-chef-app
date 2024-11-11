import { useEffect } from 'react';
import { ScrollView, StyleSheet, Image, View, Pressable, Linking } from 'react-native';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { useMealDetail } from '../hooks/useMealDetail';
import { theme } from '../styles/theme';
import { useColorScheme } from '../hooks/useColorScheme';
import { ActivityIndicator } from 'react-native';
import { createWebStyles } from '../utils/platformStyles';

interface MealDetailProps {
    id: string;
}

export function MealDetail({ id }: MealDetailProps) {
    const { meal, isLoading, error, loadMealDetail } = useMealDetail(id);
    const colorScheme = useColorScheme() as 'light' | 'dark';

    useEffect(() => {
        loadMealDetail();
    }, [loadMealDetail]);

    if (isLoading) {
        return (
            <ThemedView style={styles(colorScheme).container}>
                <ActivityIndicator size="large" color={theme.colors[colorScheme].primary} />
            </ThemedView>
        );
    }

    if (error) {
        return (
            <ThemedView style={styles(colorScheme).container}>
                <ThemedText style={styles(colorScheme).error}>{error}</ThemedText>
            </ThemedView>
        );
    }

    if (!meal) return null;

    return (
        <ScrollView>
            <ThemedView style={styles(colorScheme).container}>
                <Image 
                    source={{ uri: meal.thumbnail }} 
                    style={styles(colorScheme).image}
                />
                <ThemedText style={styles(colorScheme).title}>{meal.name}</ThemedText>
                
                <View style={styles(colorScheme).infoContainer}>
                    <ThemedText style={styles(colorScheme).category}>{meal.category}</ThemedText>
                    <ThemedText style={styles(colorScheme).area}>{meal.area}</ThemedText>
                </View>

                {meal.tags && meal.tags.length > 0 && (
                    <View style={styles(colorScheme).tagsContainer}>
                        {meal.tags.map(tag => (
                            <View key={tag} style={styles(colorScheme).tagChip}>
                                <ThemedText style={styles(colorScheme).tagText}>{tag}</ThemedText>
                            </View>
                        ))}
                    </View>
                )}

                <ThemedText style={styles(colorScheme).sectionTitle}>Ingredients</ThemedText>
                {meal.ingredients.map((ingredient, index) => (
                    <ThemedText 
                        key={`${ingredient.name}-${ingredient.measure}`} 
                        style={styles(colorScheme).ingredient}
                    >
                        • {ingredient.measure} {ingredient.name}
                    </ThemedText>
                ))}

                <ThemedText style={styles(colorScheme).sectionTitle}>Instructions</ThemedText>
                <ThemedText style={styles(colorScheme).instructions}>
                    {meal.instructions}
                </ThemedText>

                {meal.youtube && (
                    <Pressable
                        style={styles(colorScheme).button}
                        onPress={() => meal.youtube && Linking.openURL(meal.youtube)}
                    >
                        <ThemedText style={styles(colorScheme).buttonText}>
                            Watch on YouTube
                        </ThemedText>
                    </Pressable>
                )}
            </ThemedView>
        </ScrollView>
    );
}

const styles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.lg,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: theme.radius.lg,
        marginBottom: theme.spacing.md,
    },
    title: {
        ...theme.typography.title,
        color: theme.colors[colorScheme].primary,
        marginBottom: theme.spacing.sm,
    },
    infoContainer: {
        flexDirection: 'row',
        marginBottom: theme.spacing.md,
    },
    category: {
        marginRight: theme.spacing.md,
        color: theme.colors[colorScheme].secondary,
    },
    area: {
        color: theme.colors[colorScheme].secondary,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: theme.spacing.md,
    },
    tagChip: {
        backgroundColor: theme.colors[colorScheme].primary,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.radius.full,
        marginRight: theme.spacing.xs,
        marginBottom: theme.spacing.xs,
    },
    tagText: {
        color: '#FFFFFF',
        fontSize: 12,
    },
    sectionTitle: {
        ...theme.typography.subtitle,
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.sm,
    },
    ingredient: {
        marginBottom: theme.spacing.xs,
    },
    instructions: {
        lineHeight: 24,
    },
    button: {
        backgroundColor: theme.colors[colorScheme].primary,
        padding: theme.spacing.md,
        borderRadius: theme.radius.md,
        alignItems: 'center',
        marginTop: theme.spacing.lg,
        ...createWebStyles({
            cursor: 'pointer',
        })
    },
    buttonText: {
        color: '#FFFFFF',
        ...theme.typography.button,
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
}); 