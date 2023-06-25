import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';

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
    <Stack initialRouteName='home'>
      <Stack.Screen name='home' />
    </Stack>
  );
}
