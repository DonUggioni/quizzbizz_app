import { View, Text, Image } from 'react-native';

import { styles } from './settingsHeader.styles';
import { ICONS } from '../../../constants';
import HeaderIcon from '../../headerIcon/HeaderIcon';

import { useRouter } from 'expo-router';

export default function SettingsHeader({ title, icon }) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.imgContainer}>
          <Image source={icon} resizeMode='contain' style={styles.img} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <HeaderIcon
        source={ICONS.closeIcon}
        btnHeight={20}
        btnWidth={20}
        onPress={() => router.back()}
      />
    </View>
  );
}
