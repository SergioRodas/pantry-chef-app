import { ThemedText } from '@/presentation/components/ThemedText';
import { ThemedView } from '@/presentation/components/ThemedView';
import { useColorScheme } from '@/presentation/hooks/useColorScheme';
import { MealDetail } from '@/presentation/screens/MealDetail';
import { theme } from '@/presentation/styles/theme';
import { FontAwesome } from '@expo/vector-icons';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

export default function MealScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const colorScheme = useColorScheme() as 'light' | 'dark';
    const colors = theme.colors[colorScheme];

    if (!id) {
        return (
            <ThemedView style={styles(colorScheme).container}>
                <FontAwesome 
                    name="cutlery" 
                    size={64} 
                    color={colors.primary} 
                    style={styles(colorScheme).icon}
                />
                <ThemedText style={styles(colorScheme).message}>
                    Please select a meal from the search screen first
                </ThemedText>
                <Pressable
                    style={styles(colorScheme).button}
                    onPress={() => router.push('/')}
                >
                    <ThemedText style={styles(colorScheme).buttonText}>
                        Go to Search
                    </ThemedText>
                </Pressable>
            </ThemedView>
        );
    }

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Recipe Details',
                    headerStyle: {
                        backgroundColor: colors.surface,
                    },
                    headerTintColor: colors.primary,
                    headerShadowVisible: false,
                    headerTitleStyle: {
                        ...theme.typography.subtitle,
                    },
                }}
            />
            <MealDetail id={id} />
        </>
    );
}

const styles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.lg,
    },
    icon: {
        marginBottom: theme.spacing.lg,
    },
    message: {
        ...theme.typography.subtitle,
        textAlign: 'center',
        marginBottom: theme.spacing.lg,
        color: theme.colors[colorScheme].secondary,
    },
    button: {
        backgroundColor: theme.colors[colorScheme].primary,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        borderRadius: theme.radius.md,
    },
    buttonText: {
        color: '#FFFFFF',
        ...theme.typography.button,
    },
}); 