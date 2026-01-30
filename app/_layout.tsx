
import { Stack } from 'expo-router';
import { useState } from 'react';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isFirstLaunch, setIsFirstLaunch] = useState(true); // TODO: check storage

  return (
    <Stack>
      <Stack.Screen name="splash" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding1" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding2" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding3" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
