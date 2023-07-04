import { View, Text, Image } from 'react-native';

import { styles } from './settingsHeader.styles';

export default function SsettingsHeader({ title, icon }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.imgContainer}>
          <Image source={icon} resizeMode='contain' style={styles.img} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}
