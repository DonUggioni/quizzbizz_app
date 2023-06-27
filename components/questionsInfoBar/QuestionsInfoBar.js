import { View, Text } from 'react-native';

import { styles } from './questionsInfoBar.styles';

import ProgressBar from './progressBar/ProgressBar';

export default function QuestionsInfoBar() {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>
          Question: <Text style={styles.highlightText}>2</Text>/15
        </Text>
        <Text style={styles.text}>
          Points: <Text style={styles.highlightText}>10</Text>
        </Text>
      </View>
      <ProgressBar progressBarWidth={60} />
    </View>
  );
}
