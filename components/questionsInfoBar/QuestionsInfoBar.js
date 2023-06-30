import { View, Text } from 'react-native';

import { styles } from './questionsInfoBar.styles';

import { useAppContext } from '../../context/context';

import ProgressBar from './progressBar/ProgressBar';

export default function QuestionsInfoBar() {
  const { state } = useAppContext();

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>
          Question: <Text style={styles.highlightText}>{state?.index + 1}</Text>
          /{state?.quizData?.results.length}
        </Text>
        <Text style={styles.text}>
          Points: <Text style={styles.highlightText}>{state?.points}</Text>
        </Text>
      </View>
      <ProgressBar progressBarWidth={60} />
    </View>
  );
}
