import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

import { COLORS } from '../constants';
import CustomHeader from '../components/customHeader/CustomHeader';

export default function Home() {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <Stack.Screen
        options={{
          header: () => <CustomHeader />,
        }}
      />

      <Text>Home</Text>
    </View>
  );
}
