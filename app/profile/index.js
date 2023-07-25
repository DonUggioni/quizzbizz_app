import { View } from 'react-native';
import {
  Auth,
  SettingsHeader,
  Profile,
  LoadingSpinner,
  MessageModal,
} from '../../components';

import { styles } from './profile.styles';
import { Stack } from 'expo-router';
import { ICONS } from '../../constants';

import { useAppContext } from '../../context/context';
import { PaperProvider } from 'react-native-paper';

export default function index() {
  const { state, dispatch } = useAppContext();

  if (state?.isLoading) {
    return <LoadingSpinner />;
  }

  function dismissHandler() {
    dispatch({ type: 'HIDE_ERROR' });
  }

  return (
    <PaperProvider>
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
        <MessageModal
          visible={state?.modalVisible}
          onDismiss={() => dismissHandler()}
        />

        {state?.user ? <Profile /> : <Auth />}
      </View>
    </PaperProvider>
  );
}
