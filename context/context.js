import { createContext, useContext, useReducer } from 'react';
import reducer from '../reducer/reducer';

const AppContext = createContext();

const DEFAULT_NUM_OF_QUESTIONS = 15;

const initialState = {
  quizData: [],
  user: null,
  userPreferences: {
    difficulty: 'any',
    numOfQuestions: DEFAULT_NUM_OF_QUESTIONS,
  },
  currentSubject: {},
  points: 0,
  totalPoints: 0,
  index: 0,
  isLoading: false,
  error: false,
  modalVisible: false,
  correctAnswers: 0,
  wrongAnswers: 0,
  gamesPlayed: 0,
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
