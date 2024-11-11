import { useColorScheme } from '@/presentation/hooks/useColorScheme';
import { theme } from '@/presentation/styles/theme';
import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const colors = theme.colors[colorScheme];

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.secondary,
                tabBarStyle: {
                    backgroundColor: colors.surface,
                    borderTopColor: colors.border,
                },
                headerShown: false,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Search',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="search" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    title: 'Favorites',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="heart" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="meal/[id]"
                options={{
                    title: 'Recipe',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="cutlery" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
