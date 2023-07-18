import { useMemo, useState } from 'react';
import { View } from 'react-native';
import he from 'he';
import { useRouter } from 'expo-router';

import AnswerCard from '../cards/answerCard/AnswerCard';
import ActionButton from '../actionButton/ActionButton';

import { shuffleArray } from '../../utils/functions';

import { styles } from './answerList.styles';
import { useAppContext } from '../../context/context';

import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const EASY_QUESTION_POINTS = 10;
const MEDIUM_QUESTION_POINTS = 15;
const HARD_QUESTION_POINTS = 20;

export default function QuestionList() {
  const [choosenAnswer, setChoosenAnswer] = useState(null);
  const [answerStyle, setAnswerStyle] = useState('');
  const router = useRouter();
  const { dispatch, state } = useAppContext();

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
    }
    setTimeout(() => {
      if (state?.index + 1 === state.quizData.results?.length) {
        router.replace('/finishStats');
        dispatch({ type: 'UPDATE_GAME_STATS' });

        setTimeout(async () => {
          if (state?.user === null) return;
          try {
            await setDoc(
              doc(db, state?.user.uid, state?.user.email),
              {
                gamesPlayed: state?.gamesPlayed,
                totalCorrectAnswers: state?.totalCorrectAnswers,
                totalWrongAnswers: state?.totalWrongAnswers,
                totalPoints: state?.totalPoints,
              },
              { merge: true }
            );
          } catch (error) {
            console.log(error.message);
          }
        }, 1000);
      }
      setAnswerStyle('');
      dispatch({ type: 'NEXT_QUESTION' });
    }, 500);
  }

  return (
    <View style={styles.container}>
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
