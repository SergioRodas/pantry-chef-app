import { ThemedView } from '@/presentation/components/ThemedView';
import { ThemedText } from '@/presentation/components/ThemedText';
import { StyleSheet } from 'react-native';
import { theme } from '@/presentation/styles/theme';
import { useColorScheme } from '@/presentation/hooks/useColorScheme';

export default function FavoritesScreen() {
    const colorScheme = useColorScheme() as 'light' | 'dark';

    return (
        <ThemedView style={styles(colorScheme).container}>
            <ThemedText style={styles(colorScheme).title}>
                My Favorite Recipes
            </ThemedText>
            <ThemedText style={styles(colorScheme).subtitle}>
                Coming soon...
            </ThemedText>
        </ThemedView>
    );
}

const styles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.lg,
        backgroundColor: theme.colors[colorScheme].background,
    },
    title: {
        ...theme.typography.title,
        color: theme.colors[colorScheme].primary,
        marginBottom: theme.spacing.md,
    },
    subtitle: {
        ...theme.typography.subtitle,
        color: theme.colors[colorScheme].secondary,
    },
}); 