import { View } from 'react-native';
import { Auth, SettingsHeader } from '../../components';

import { styles } from './auth.styles';
import { Stack } from 'expo-router';
import { ICONS } from '../../constants';

export default function index() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          header: () => {
            return (
              <SettingsHeader icon={ICONS.profileIcon} title={'Profile'} />
            );
          },
        }}
      />
      <Auth />
    </View>
  );
}
