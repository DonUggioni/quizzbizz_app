import { Text, TouchableOpacity } from 'react-native';

import { styles } from './questionCard.styles';
import { COLORS } from '../../../constants';

export default function QuestionCard({ subject, isActive, onPress, question }) {
  const containerStyle = {
    ...styles.container,
    backgroundColor: isActive ? COLORS.secondary : 'transparent',
  };

  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <Text style={styles.subject}>{question}</Text>
    </TouchableOpacity>
  );
}
