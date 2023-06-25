import { Image, TouchableOpacity } from 'react-native';

import { styles } from './headerIcon.style';

export default function HeaderIcon({ source, btnWidth, btnHeight, style }) {
  return (
    <TouchableOpacity style={[styles.btnContainer, style]}>
      <Image
        resizeMode='cover'
        source={source}
        style={styles.btnImage(btnWidth, btnHeight)}
      />
    </TouchableOpacity>
  );
}
