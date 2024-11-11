import { useThemeStore } from '../stores/useThemeStore';

export function useColorScheme() {
    return useThemeStore((state) => state.theme);
}
