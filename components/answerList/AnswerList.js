import { useEffect, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import he from 'he';
import { useRouter } from 'expo-router';

import AnswerCard from '../cards/answerCard/AnswerCard';
import ActionButton from '../actionButton/ActionButton';

import { shuffleArray } from '../../utils/functions';

import { styles } from './answerList.styles';
import { useAppContext } from '../../context/context';

import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

import useSound from '../../hooks/useSound';
import { SOUNDS } from '../../constants';

import {
  EASY_QUESTION_POINTS,
  MEDIUM_QUESTION_POINTS,
  HARD_QUESTION_POINTS,
} from '../../utils/defaults';

export default function AnswerList() {
  const [choosenAnswer, setChoosenAnswer] = useState(null);
  const [answerStyle, setAnswerStyle] = useState('');
  const router = useRouter();
  const { dispatch, state } = useAppContext();
  const { playSoundEffect, stopMusic } = useSound();

  const incorrectAnswers =
    state.quizData?.results[state.index]?.incorrect_answers;
  const correctAnswer = state.quizData?.results[state.index]?.correct_answer;
  const questionDifficulty = state.quizData?.results[state.index]?.difficulty;
  const currentAnswersArray = [...incorrectAnswers, correctAnswer];

  // This function is shuffling the answers so the correct answer is in a different place everytime.
  const shuffledAnswers = useMemo(() => {
    return shuffleArray(currentAnswersArray);
  }, [state?.index]);

  function nextHandler() {
    if (!choosenAnswer) return;
    const updatedAnswerStyle = shuffledAnswers.map((answer) => {
      if (answer === correctAnswer) {
        return styles.isCorrect;
      } else if (answer === choosenAnswer) {
        return styles.isIncorrect;
      } else {
        return '';
      }
    });
    setAnswerStyle(updatedAnswerStyle);
    setChoosenAnswer(null);

    if (choosenAnswer === correctAnswer) {
      if (!choosenAnswer) return;
      playSoundEffect(SOUNDS.rightAnswer);

      if (questionDifficulty === 'easy') {
        dispatch({ type: 'ADD_POINTS', payload: EASY_QUESTION_POINTS });
      }

      if (questionDifficulty === 'medium') {
        dispatch({ type: 'ADD_POINTS', payload: MEDIUM_QUESTION_POINTS });
      }

      if (questionDifficulty === 'hard') {
        dispatch({ type: 'ADD_POINTS', payload: HARD_QUESTION_POINTS });
      }
      dispatch({ type: 'ADD_CORRECT_ANSWER' });
    } else {
      dispatch({ type: 'ADD_WRONG_ANSWER' });
      playSoundEffect(SOUNDS.wrongAnswer);
    }

    setTimeout(() => {
      if (state?.index + 1 === state.quizData.results?.length) {
        dispatch({ type: 'UPDATE_GAME_STATS' });

        stopMusic();
        router.replace('/finishStats');
      }
      setAnswerStyle('');
      dispatch({ type: 'NEXT_QUESTION' });
    }, 500);
  }

  // Using useMemo here to memoize the state and avoid unnecessary triggering of the useEffect that will update the stats to firebase whenever the firebaseState is updated. This also ensures that the latest state is updated to firebase.
  const firebaseState = useMemo(
    () => ({
      gamesPlayed: state?.gamesPlayed,
      totalPoints: state?.totalPoints,
      totalCorrectAnswers: state.totalCorrectAnswers,
      totalWrongAnswers: state.totalWrongAnswers,
    }),
    [state]
  );

  useEffect(() => {
    if (state?.user === null) return;

    async function updateStatsToFirebase() {
      try {
        await setDoc(
          doc(db, state?.user.uid, state?.user.email),

          firebaseState,

          { merge: true }
        );
      } catch (error) {
        console.log(error.message);
      }
    }

    updateStatsToFirebase();
  }, [firebaseState]);

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: '100%' }}>
        {shuffledAnswers?.map((answer, index) => {
          return (
            <AnswerCard
              question={he.decode(answer)}
              key={answer}
              onPress={() => setChoosenAnswer(answer)}
              isActive={answer === choosenAnswer}
              answerStyle={answerStyle[index]}
            />
          );
        })}
      </ScrollView>
      <ActionButton
        text={
          state.quizData.results?.length === state?.index + 1
            ? 'Finish'
            : 'Next'
        }
        onPress={() => nextHandler()}
      />
    </View>
  );
}
