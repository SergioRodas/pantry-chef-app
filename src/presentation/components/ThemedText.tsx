import { StyleSheet, Text, type TextProps } from 'react-native';
import { useColorScheme } from '../hooks/useColorScheme';
import { theme } from '../styles/theme';

export type ThemedTextProps = TextProps & {
  type?: 'title' | 'subtitle' | 'body';
};

export function ThemedText({
  style,
  type = 'body',
  ...rest
}: ThemedTextProps) {
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const colors = theme.colors[colorScheme];

  return (
    <Text
      style={[
        { color: colors.text },
        type === 'title' ? styles.title : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'body' ? styles.body : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    ...theme.typography.title,
  },
  subtitle: {
    ...theme.typography.subtitle,
  },
  body: {
    ...theme.typography.input,
  },
});
