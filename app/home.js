import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

import { COLORS } from '../constants';

export default function Home() {
  return (
    <View>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.secondary,
          },
        }}
      />
    </View>
  );
}
