import { View, Text } from 'react-native';

import { styles } from './customHomeHeader.styles';
import { ICONS } from '../../../constants';
import HeaderIcon from '../../headerIcon/HeaderIcon';
import { trackEvent } from '@aptabase/react-native';
import { useAppContext } from '../../../context/context';

import { useRouter } from 'expo-router';

export default function CustomHomeHeader() {
  const { state } = useAppContext();
  const router = useRouter();

  function optionsHandler() {
    trackEvent('options window viewed');
    router.push('/options');
  }

  function profileHandler() {
    trackEvent('profile window viewed');
    router.push('/profile');
  }

  return (
    <View style={styles.container}>
      <HeaderIcon
        source={ICONS.settingsIcon}
        btnWidth={30}
        btnHeight={30}
        onPress={() => optionsHandler()}
      />
      <Text style={styles.heading}>QuizzBizz</Text>
      <HeaderIcon
        source={
          state.user !== null ? { uri: state.photoURL } : ICONS.profileIcon
        }
        btnWidth={35}
        btnHeight={35}
        style={{ paddingTop: 12 }}
        onPress={() => profileHandler()}
      />
    </View>
  );
}
