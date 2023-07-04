import { Text, Pressable } from 'react-native';

import { styles } from './answerCard.styles';
import { COLORS } from '../../../constants';

export default function QuestionCard({
  isActive,
  onPress,
  question,
  answerStyle,
}) {
  const containerStyle = {
    ...styles.container,
    backgroundColor: isActive ? COLORS.secondary : 'transparent',
  };

  return (
    <Pressable style={[containerStyle, answerStyle]} onPress={onPress}>
      <Text style={styles.subject}>{question}</Text>
    </Pressable>
  );
}
