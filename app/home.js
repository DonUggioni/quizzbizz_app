import { View } from 'react-native';
import { Stack } from 'expo-router';
import { COLORS } from '../constants';
import { CustomHomeHeader, SubjectList } from '../components';
import { PaperProvider } from 'react-native-paper';

import { trackEvent } from '@aptabase/react-native';

export default function Home() {
  trackEvent('homepage_visited');

  return (
    <PaperProvider>
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
        <SubjectList />
      </View>
    </PaperProvider>
  );
}
