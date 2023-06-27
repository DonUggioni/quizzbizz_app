import { View, Text } from 'react-native';

import { styles } from './questionBox.styles';

export default function QuestionBox() {
  return (
    <View style={styles.questionBox}>
      <Text style={styles.questionText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      </Text>
    </View>
  );
}
