import {
  DEFAULT_NUM_OF_QUESTIONS,
  DEFAULT_QUESTION_DIFFICULTY,
} from '../utils/defaults';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_DATA_SUCCESS':
      return { ...state, quizData: action.payload };
    case 'FETCH_DATA_ERROR':
      return {
        ...state,
        isLoading: false,
        error: { ...state.error, error: true },
      };
    case 'FETCH_SUBJECT_LIST':
      return { ...state, subjectList: action.payload };
    case 'CURRENT_SUBJECT':
      return { ...state, currentSubject: action.payload };
    case 'NEXT_QUESTION':
      return { ...state, index: state.index + 1 };
    case 'ADD_POINTS':
      return { ...state, points: state.points + action.payload };
    case 'UPDATE_GAME_STATS':
      return {
        ...state,
        totalPoints: state.totalPoints + state.points,
        gamesPlayed: state.gamesPlayed + 1,
        totalCorrectAnswers: state.totalCorrectAnswers + state.correctAnswers,
        totalWrongAnswers: state.totalWrongAnswers + state.wrongAnswers,
      };
    case 'CANCEL_QUIZ':
      return {
        ...state,
        points: 0,
        index: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        modalVisible: false,
        quizData: [],
        currentSubject: null,
      };
    case 'SHOW_MODAL':
      return { ...state, modalVisible: true };
    case 'HIDE_MODAL':
      return {
        ...state,
        modalVisible: false,
      };
    case 'ADD_CORRECT_ANSWER':
      return { ...state, correctAnswers: state.correctAnswers + 1 };
    case 'ADD_WRONG_ANSWER':
      return { ...state, wrongAnswers: state.wrongAnswers + 1 };
    case 'RESTART':
      return {
        ...state,
        correctAnswers: 0,
        wrongAnswers: 0,
        points: 0,
        index: 0,
        quizData: [],
        currentSubject: null,
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
    case 'SET_USER_INFO':
      return {
        ...state,
        userPreferences: action.payload.userPreferences,
        totalPoints: action.payload.totalPoints,
        totalCorrectAnswers: action.payload.totalCorrectAnswers,
        totalWrongAnswers: action.payload.totalWrongAnswers,
        gamesPlayed: action.payload.gamesPlayed,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        quizData: [],
        userPreferences: {
          difficulty: DEFAULT_QUESTION_DIFFICULTY,
          numOfQuestions: DEFAULT_NUM_OF_QUESTIONS,
        },
        user: null,
        points: 0,
        totalPoints: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        gamesPlayed: 0,
        totalCorrectAnswers: 0,
        totalWrongAnswers: 0,
        currentSubject: null,
      };
    case 'SHOW_MESSAGE':
      return {
        ...state,
        error: { ...state.error, message: action.payload },
        modalVisible: true,
      };
    case 'HIDE_MESSAGE':
      return {
        ...state,
        error: { ...state.error, message: '' },
        modalVisible: false,
      };
    case 'SET_CURRENT_MUSIC':
      return { ...state, currentMusic: action.payload };
    case 'SET_AD_IS_LOADED':
      return { ...state, adIsLoaded: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default reducer;
