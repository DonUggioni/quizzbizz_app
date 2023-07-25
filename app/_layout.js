import 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import ContextProvider from '../context/context';
import { useEffect } from 'react';

import * as SplashScreen from 'expo-splash-screen';

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: 'index',
};

export default function Layout() {
  const [fontsLoaded] = useFonts({
    JostRegular: require('../assets/fonts/Jost-Regular.ttf'),
    JostSemiBold: require('../assets/fonts/Jost-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <ContextProvider>
      <Stack initialRouteName='home'>
        <Stack.Screen name='home' />
      </Stack>
    </ContextProvider>
  );
}
