import { Image, TouchableOpacity } from 'react-native';

import { styles } from './headerIcon.style';

export default function HeaderIcon({
  source,
  btnWidth,
  btnHeight,
  style,
  onPress,
}) {
  return (
    <TouchableOpacity style={[styles.btnContainer, style]} onPress={onPress}>
      <Image
        resizeMode='cover'
        source={source}
        style={styles.btnImage(btnWidth, btnHeight)}
      />
    </TouchableOpacity>
  );
}
