import { Platform } from 'react-native';

// Estilos globales y tokens de diseño
export const theme = {
  colors: {
    light: {
      primary: '#FF6B6B',
      secondary: '#666',
      background: '#F5F5F5',
      surface: '#FFFFFF',
      text: '#333',
      placeholder: '#666',
      border: '#E0E0E0',
    },
    dark: {
      primary: '#FF8585',
      secondary: '#999',
      background: '#121212',
      surface: '#1E1E1E',
      text: '#FFFFFF',
      placeholder: '#999',
      border: '#333',
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 40,
  },
  typography: {
    title: {
      fontSize: 36,
      fontWeight: 'bold' as const,
    },
    subtitle: {
      fontSize: 18,
    },
    input: {
      fontSize: 16,
    }
  },
  shadows: {
    default: Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)',
      },
      default: {},
    })
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
  }
} as const;

// Agregamos tipos para TypeScript
export type Theme = typeof theme; 