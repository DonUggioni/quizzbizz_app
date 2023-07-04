import { View, Text } from 'react-native';

import { styles } from './customHomeHeader.styles';
import { ICONS } from '../../../constants';
import HeaderIcon from '../../headerIcon/HeaderIcon';

import { useRouter } from 'expo-router';

export default function CustomHomeHeader() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <HeaderIcon
        source={ICONS.settingsIcon}
        btnWidth={30}
        btnHeight={30}
        onPress={() => router.push('/options')}
      />
      <Text style={styles.heading}>QuizMe</Text>
      <HeaderIcon
        source={ICONS.profileIcon}
        btnWidth={35}
        btnHeight={35}
        style={{ paddingTop: 12 }}
      />
    </View>
  );
}
