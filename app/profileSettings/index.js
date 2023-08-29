import { ProfileSettingsScreen } from '../../components';
import { Stack } from 'expo-router';

import { View } from 'react-native';

import { styles } from './profileSettings.styles';

export default function ProfileSettings() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
      <ProfileSettingsScreen />
    </View>
  );
}
