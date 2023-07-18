import { View } from 'react-native';
import {
  Auth,
  SettingsHeader,
  Profile,
  LoadingSpinner,
} from '../../components';

import { styles } from './profile.styles';
import { Stack } from 'expo-router';
import { ICONS } from '../../constants';

import { useAppContext } from '../../context/context';

export default function index() {
  const { state } = useAppContext();

  if (state?.isLoading) {
    return <LoadingSpinner />;
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
