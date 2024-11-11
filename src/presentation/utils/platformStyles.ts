import { Platform, ViewStyle } from 'react-native';

type WebStylesProps = {
    transition?: string;
    cursor?: 'pointer' | 'default' | 'not-allowed';
    // Añade aquí otras propiedades web específicas que necesites
};

export const createWebStyles = (styles: WebStylesProps): ViewStyle => {
    if (Platform.OS === 'web') {
        return styles as ViewStyle;
    }
    return {};
}; 