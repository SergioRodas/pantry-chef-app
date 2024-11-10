import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useColorScheme } from '../hooks/useColorScheme';
import { ThemedText } from '@/presentation/components/ThemedText';
import { ThemedView } from '@/presentation/components/ThemedView';
import { theme } from '../styles/theme';

export function SearchIngredient() {
  const [ingredient, setIngredient] = useState('');
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const colors = theme.colors[colorScheme];

  return (
    <ThemedView style={styles(colorScheme).container}>
      <View style={styles(colorScheme).header}>
        <ThemedText style={styles(colorScheme).title}>Pantry Chef</ThemedText>
        <ThemedText style={styles(colorScheme).subtitle}>
          Find recipes with your ingredients
        </ThemedText>
      </View>

      <View style={styles(colorScheme).searchContainer}>
        <TextInput
          style={styles(colorScheme).input}
          placeholder="Enter an ingredient..."
          placeholderTextColor={colors.placeholder}
          value={ingredient}
          onChangeText={setIngredient}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
    </ThemedView>
  );
}

const styles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors[colorScheme].background,
  },
  header: {
    marginTop: theme.spacing.xl,
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  title: {
    ...theme.typography.title,
    color: theme.colors[colorScheme].primary,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    ...theme.typography.subtitle,
    color: theme.colors[colorScheme].secondary,
    textAlign: 'center',
  },
  searchContainer: {
    backgroundColor: theme.colors[colorScheme].surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.xs,
    ...theme.shadows.default,
  },
  input: {
    height: 50,
    paddingHorizontal: theme.spacing.md,
    ...theme.typography.input,
    color: theme.colors[colorScheme].text,
  },
}); 