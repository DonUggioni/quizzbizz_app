const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_DATA_SUCCESS':
      return { ...state, quizData: action.payload };
    case 'FETCH_DATA_ERROR':
      return { ...state, isLoading: false, error: true };
    case 'CURRENT_SUBJECT':
      return { ...state, currentSubject: action.payload };
    case 'NEXT_QUESTION':
      return { ...state, index: state.index + 1 };
    case 'ADD_POINTS':
      return { ...state, points: state.points + action.payload };
    case 'CANCEL_QUIZ':
      return {
        ...state,
        points: 0,
        index: 0,
        correctAnswers: 0,
        modalVisible: false,
      };
    case 'SHOW_MODAL':
      return { ...state, modalVisible: true };
    case 'HIDE_MODAL':
      return { ...state, modalVisible: false };
    case 'ADD_CORRECT_ANSWER':
      return { ...state, correctAnswers: state.correctAnswers + 1 };
    case 'RESTART':
      return {
        ...state,
        correctAnswers: 0,
        points: 0,
        index: 0,
      };
    case 'SHOW_LOADING_SCREEN':
      return { ...state, isLoading: true };
    case 'HIDE_LOADING_SCREEN':
      return { ...state, isLoading: false };
    case 'UPDATE_USER_PREFERENCES':
      return { ...state, userPreferences: action.payload };
    case 'SET_CURRENT_SUBJECT':
      return { ...state, currentSubject: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default reducer;