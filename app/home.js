import { View } from 'react-native';
import { Stack } from 'expo-router';

import { COLORS } from '../constants';
import { CustomHomeHeader, PointsDisplay, SubjectList } from '../components';

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
        paddingHorizontal: 24,
      }}
    >
      <Stack.Screen
        options={{
          header: () => {
            return <CustomHomeHeader />;
          },
        }}
      />

      <PointsDisplay />
      <SubjectList />
    </View>
  );
}
