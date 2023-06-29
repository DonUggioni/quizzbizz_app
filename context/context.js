import { createContext, useContext, useReducer } from 'react';
import reducer from '../reducer/reducer';

const AppContext = createContext();

const initialState = {
  quizData: [],
  currentSubject: {},
  points: 0,
  index: 0,
  isLoading: false,
  error: false,
  modalVisible: false,
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
