import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { styles } from './progressBar.styles';
import { useAppContext } from '../../../context/context';

import { useRouter } from 'expo-router';

export default function ProgressBar() {
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  const [timerPercentage, setTimerPercentage] = useState(100);

  let timeInterval;

  function timer() {
    let totalTimePerQuestion = state.timerTime;
    let remainingTime = totalTimePerQuestion;
    timeInterval = setInterval(() => {
      remainingTime -= 0.01;
      if (remainingTime <= 0) {
        if (state?.index + 1 === state.quizData?.results?.length) {
          router.replace('/finishStats');
        }
        dispatch({ type: 'NEXT_QUESTION' });
      }
      const formattedTime = remainingTime.toFixed(2);
      setTimerPercentage(((formattedTime / totalTimePerQuestion) * 1000) / 10);
    }, 10);
  }

  useEffect(() => {
    setTimerPercentage(100);
    timer();

    return () => {
      clearInterval(timeInterval);
    };
  }, [state?.index]);

  return (
    <View style={styles.container}>
      <View style={styles.bar(`${timerPercentage}%`)} />
    </View>
  );
}
