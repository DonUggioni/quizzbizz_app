import { TouchableOpacity, Text } from 'react-native';

import { styles } from './actionButton.styles';

export default function ActionButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>Quiz Me</Text>
    </TouchableOpacity>
  );
}
