import { Text, Pressable } from 'react-native';

import { styles } from './actionButton.styles';

export default function ActionButton({ onPress, text, disabled }) {
  return (
    <Pressable style={styles.container} disabled={disabled} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}
