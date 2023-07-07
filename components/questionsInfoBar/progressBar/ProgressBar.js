import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { styles } from './progressBar.styles';
import { useAppContext } from '../../../context/context';

import { useRouter } from 'expo-router';

const TIME_PER_QUESTION = 30000;

export default function ProgressBar() {
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  const [timerPercentage, setTimerPercentage] = useState(100);

  let timeInterval;

  function timer() {
    const startTime = Date.now();
    const totalTimePerQuestion = TIME_PER_QUESTION;

    timeInterval = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const remainingTime = Math.max(totalTimePerQuestion - elapsedTime, 0);

      if (remainingTime <= 0) {
        if (state?.index + 1 === state.quizData?.results?.length) {
          router.replace('/finishStats');
        }
        dispatch({ type: 'NEXT_QUESTION' });
      }

      const formattedTime = (remainingTime / totalTimePerQuestion) * 100;
      setTimerPercentage(formattedTime);
    }, 100);
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
