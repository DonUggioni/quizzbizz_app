import { View } from 'react-native';
import { Stack } from 'expo-router';
import { COLORS } from '../../constants';
import GeneralHeader from '../../components/customHeaders/generalHeader/GeneralHeader';

export default function Questions() {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.secondary,
          },
          headerTitleStyle: { color: COLORS.white },
          headerBackVisible: false,
          header: () => <GeneralHeader />,
        }}
      />
    </View>
  );
}
