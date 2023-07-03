import { useMemo, useState } from 'react';
import { View } from 'react-native';
import he from 'he';
import { useRouter, useSearchParams } from 'expo-router';

import QuestionCard from '../cards/questionCard/QuestionCard';
import ActionButton from '../actionButton/ActionButton';

import { shuffleArray } from '../../utils/functions';

import { styles } from './questionList.styles';
import { useAppContext } from '../../context/context';

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

  const shuffledAnswers = useMemo(() => {
    return shuffleArray(currentAnswersArray);
  }, [state?.index]);

  function nextHandler() {
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
    }

    setTimeout(() => {
      if (state?.index + 1 === state.quizData.results?.length) {
        router.replace('/finishStats');
      }
      setAnswerStyle('');
      dispatch({ type: 'NEXT_QUESTION' });
    }, 1200);
  }

  return (
    <View style={styles.container}>
      {shuffledAnswers?.map((answer, index) => {
        return (
          <QuestionCard
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
