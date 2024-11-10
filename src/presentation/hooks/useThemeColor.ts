import { theme } from '../styles/theme';
import { useColorScheme } from './useColorScheme';

// Definimos los tipos más específicamente
type ColorScheme = 'light' | 'dark';
type ThemeColors = typeof theme.colors[ColorScheme];
type ColorName = keyof ThemeColors;

export function useThemeColor(colorName: ColorName) {
  const colorScheme = useColorScheme() as ColorScheme;
  
  return theme.colors[colorScheme][colorName];
}
