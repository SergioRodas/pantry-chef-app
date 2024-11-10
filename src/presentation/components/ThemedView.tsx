import { View, type ViewProps } from 'react-native';
import { useColorScheme } from '../hooks/useColorScheme';
import { theme } from '../styles/theme';

export type ThemedViewProps = ViewProps;

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  const colorScheme = useColorScheme();
  const backgroundColor = theme.colors[colorScheme].background;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
