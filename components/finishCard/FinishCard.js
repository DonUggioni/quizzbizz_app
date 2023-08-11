import { useCallback } from 'react';
import { View, Text } from 'react-native';
import { styles } from './finishCard.styles';

import { ANIMATIONS, SOUNDS } from '../../constants';
import Lottie from 'lottie-react-native';

import { useAppContext } from '../../context/context';
import { calculatePercentage } from '../../utils/functions';
import ActionButton from '../actionButton/ActionButton';

import { useRouter } from 'expo-router';

import Animated, { BounceInUp, FadeInDown } from 'react-native-reanimated';
import { trackEvent } from '@aptabase/react-native';

import useSound from '../../hooks/useSound';

export default function FinishCard() {
  const { state, dispatch } = useAppContext();
  const { playSoundEffect } = useSound();
  const router = useRouter();

  const questionsLength = state.quizData?.results.length;

  const percentageOfCorrectAnswers = calculatePercentage(
    state?.correctAnswers,
    questionsLength
  );

  function restartQuiz() {
    trackEvent('clicked', { button: 'play_again' });

    dispatch({ type: 'RESTART' });
    router.replace('/home');
    // playAd();
  }

  function animation() {
    soundEffect();
    if (percentageOfCorrectAnswers >= 75) {
      return ANIMATIONS.throphyAnimation;
    }

    if (percentageOfCorrectAnswers > 45 && percentageOfCorrectAnswers < 75) {
      return ANIMATIONS.thumbsUp;
    }

    return ANIMATIONS.sadEmoji;
  }

  const soundEffect = useCallback(() => {
    if (percentageOfCorrectAnswers >= 75) {
      return playSoundEffect(SOUNDS.greatScore);
    }

    if (percentageOfCorrectAnswers > 45 && percentageOfCorrectAnswers < 75) {
      return playSoundEffect(SOUNDS.goodScore);
    }

    return playSoundEffect(SOUNDS.badScore);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Animated.View entering={BounceInUp} style={styles.statsContainer}>
          <Lottie
            testID='LottieAnimation'
            source={animation()}
            style={styles.animationSize}
            autoPlay
            loop={false}
          />
          <View style={styles.pointsContainer}>
            <Text style={styles.heading}>
              {percentageOfCorrectAnswers >= 75
                ? 'Great job!'
                : percentageOfCorrectAnswers > 45 &&
                  percentageOfCorrectAnswers < 75
                ? 'Good job!'
                : 'Oh boy!'}
            </Text>
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
        </Animated.View>
      </View>
      <View style={styles.btnContainer}>
        <Animated.View entering={FadeInDown.delay(1200).duration(1200)}>
          <ActionButton text={'Quizz Me Again'} onPress={() => restartQuiz()} />
        </Animated.View>
      </View>
    </>
  );
}
