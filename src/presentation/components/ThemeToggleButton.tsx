import { FontAwesome } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { useColorScheme } from '../hooks/useColorScheme';
import { useThemeStore } from '../stores/useThemeStore';
import { theme } from '../styles/theme';
import { createWebStyles } from '../utils/platformStyles';

type PressableStateWithHover = {
    pressed: boolean;
    hovered?: boolean;
};

export function ThemeToggleButton() {
    const colorScheme = useColorScheme();
    const toggleTheme = useThemeStore((state) => state.toggleTheme);

    const handlePress = () => {
        console.log('Toggling theme from:', colorScheme);
        toggleTheme();
    };

    return (
        <View style={styles(colorScheme).container}>
            <Pressable
                onPress={handlePress}
                style={({ pressed, hovered }: PressableStateWithHover) => [
                    styles(colorScheme).button,
                    pressed && styles(colorScheme).buttonPressed,
                    hovered && styles(colorScheme).buttonHovered,
                ]}
            >
                <FontAwesome
                    name={colorScheme === 'dark' ? 'sun-o' : 'moon-o'}
                    size={24}
                    color={theme.colors[colorScheme].text}
                />
            </Pressable>
        </View>
    );
}

const styles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 80,
        right: 16,
        zIndex: 1000,
        ...theme.shadows.default,
    },
    button: {
        backgroundColor: theme.colors[colorScheme].surface,
        padding: theme.spacing.md,
        borderRadius: theme.radius.full,
        ...createWebStyles({
            cursor: 'pointer',
            transition: 'all 0.2s ease',
        }),
    },
    buttonPressed: {
        opacity: 0.7,
    },
    buttonHovered: {
        transform: [{ scale: 1.1 }],
    },
}); 