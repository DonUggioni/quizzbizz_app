import { View, Text } from 'react-native';
import he from 'he';
import { useAppContext } from '../../context/context';

import { styles } from './questionBox.styles';

export default function QuestionBox() {
  const { state } = useAppContext();

  const question = state.quizData.results[state.index]?.question;

  return (
    <View style={styles.questionBox}>
      <Text style={styles.questionText}>{he.decode(question)}</Text>
    </View>
  );
}
