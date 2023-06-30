import { View, Text } from 'react-native';
import { styles } from './finishCard.styles';

import { ANIMATIONS } from '../../constants';
import Lottie from 'lottie-react-native';

import { useAppContext } from '../../context/context';
import { calculatePercentage } from '../../utils/functions';
import ActionButton from '../actionButton/ActionButton';

import { useRouter } from 'expo-router';

export default function FinishCard() {
  const { state, dispatch } = useAppContext();
  const router = useRouter();

  const questionsLength = state.quizData?.results.length;

  const percentageOfCorrectAnswers = calculatePercentage(
    state?.correctAnswers,
    questionsLength
  );

  function restartQuiz() {
    dispatch({ type: 'RESTART' });
    router.replace('/home');
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.statsContainer}>
          <Lottie
            source={ANIMATIONS.throphyAnimation}
            style={styles.animationSize}
            autoPlay
            loop={false}
            speed={1}
          />
          <View style={styles.pointsContainer}>
            <Text style={styles.heading}>Congratulations!</Text>
            <Text style={styles.text}>
              Score:{' '}
              <Text style={styles.highlightOrange}>{state.points}pts</Text>
            </Text>
          </View>
          <View style={styles.paddingBottom}>
            <Text style={styles.text}>
              You got{' '}
              <Text style={styles.highlightOrange}>
                {percentageOfCorrectAnswers}%
              </Text>{' '}
              right out of{' '}
              <Text style={styles.highlightBlue}>{questionsLength}</Text>{' '}
              questions.
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <ActionButton text={'Quiz Me Again'} onPress={() => restartQuiz()} />
      </View>
    </>
  );
}
