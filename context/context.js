import { createContext, useContext, useReducer } from 'react';
import reducer from '../reducer/reducer';

import {
  DEFAULT_NUM_OF_QUESTIONS,
  DEFAULT_QUESTION_DIFFICULTY,
} from '../utils/defaults';

const AppContext = createContext();

const initialState = {
  quizData: [],
  subjectList: [],
  user: null,
  userPreferences: {
    difficulty: DEFAULT_QUESTION_DIFFICULTY,
    numOfQuestions: DEFAULT_NUM_OF_QUESTIONS,
  },
  currentSubject: null,
  points: 0,
  totalPoints: 0,
  index: 0,
  isLoading: false,
  error: {
    error: false,
    message: '',
  },
  modalVisible: false,
  correctAnswers: 0,
  wrongAnswers: 0,
  gamesPlayed: 0,
  totalCorrectAnswers: 0,
  totalWrongAnswers: 0,
};

function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const { state, dispatch } = useContext(AppContext);
  return { state, dispatch };
}

export default ContextProvider;
