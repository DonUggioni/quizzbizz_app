import { View } from 'react-native';
import { Auth, SettingsHeader, Profile } from '../../components';

import { styles } from './profile.styles';
import { Stack } from 'expo-router';
import { COLORS, ICONS } from '../../constants';

import { useAppContext } from '../../context/context';
import { ActivityIndicator } from 'react-native-paper';

export default function index() {
  const { state } = useAppContext();

  if (state?.isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.primary,
        }}
      >
        <ActivityIndicator size={'large'} color={COLORS.secondary} />
      </View>
    );
  }

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
      {state?.user ? <Profile /> : <Auth />}
    </View>
  );
}
