
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';

import { AuthProvider } from '../context/AuthContext';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  /* 
  const [loaded] = useFonts({
    'Gordita-Regular': require('../assets/fonts/Gordita-Regular.ttf'),
    'Gordita-Medium': require('../assets/fonts/Gordita-Medium.ttf'),
    'Gordita-Bold': require('../assets/fonts/Gordita-Bold.ttf'),
    'Gordita-Black': require('../assets/fonts/Gordita-Black.ttf'),
  }); 
  */
  const loaded = true; // Temporary bypass

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding1" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding2" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding3" options={{ headerShown: false }} />
        <Stack.Screen name="(user)" options={{ headerShown: false }} />
        <Stack.Screen name="(rider)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </AuthProvider>
  );
}
