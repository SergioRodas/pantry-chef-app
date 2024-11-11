import { View, ViewStyle } from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';

interface ThemedViewProps {
    style?: ViewStyle | ViewStyle[];
    children: React.ReactNode;
}

export function ThemedView({ style, children }: ThemedViewProps) {
    const backgroundColor = useThemeColor('background');
    
    return (
        <View 
            style={[
                { backgroundColor },
                style
            ]}
        >
            {children}
        </View>
    );
}
