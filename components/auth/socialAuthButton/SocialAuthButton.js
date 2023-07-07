import { Image, Pressable, Text } from 'react-native';

import { styles } from './socialAuthButton.styles';
import { ICONS } from '../../../constants';

export default function SocialAuthButton({ text, logo }) {
  return (
    <Pressable
      style={({ pressed }) => [
        { opacity: pressed ? 0.8 : 1 },
        styles.container,
      ]}
    >
      <Image source={ICONS[`${logo}-logo`]} style={styles.img} />
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}
