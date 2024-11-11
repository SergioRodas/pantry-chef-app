import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { View } from 'react-native';

import { ThemeToggleButton } from '@/presentation/components/ThemeToggleButton';
import { useColorScheme } from '@/presentation/hooks/useColorScheme';
import { theme } from '@/presentation/styles/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View 
        style={{ 
          flex: 1, 
          backgroundColor: theme.colors[colorScheme].background 
        }}
      >
        <Stack 
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors[colorScheme].surface,
            },
            headerTintColor: theme.colors[colorScheme].text,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <ThemeToggleButton />
      </View>
    </ThemeProvider>
  );
}
