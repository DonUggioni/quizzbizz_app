import { View, Text, Image } from 'react-native';
import HeaderIcon from '../../headerIcon/HeaderIcon';

import { styles } from './generalHeader.styles';
import { ICONS } from '../../../constants';

import { useRouter } from 'expo-router';

export default function GeneralHeader({ icon, title }) {
  const router = useRouter();

  function closeHandler() {
    router.back();
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.imgContainer}>
          <Image
            source={ICONS['icon-11']}
            resizeMode='contain'
            style={styles.img}
          />
        </View>
        <Text style={styles.title}>General Header</Text>
      </View>
      <HeaderIcon
        source={ICONS.closeIcon}
        btnHeight={18}
        btnWidth={18}
        onPress={() => closeHandler()}
      />
    </View>
  );
}
