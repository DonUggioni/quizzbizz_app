import { getData } from '../utils/functions';
import { useAppContext } from '../context/context';

import { useRouter } from 'expo-router';

function useFetch() {
  const router = useRouter();
  const { state, dispatch } = useAppContext();

  async function fetchQuestions(endpoint, params) {
    dispatch({ type: 'SHOW_LOADING_SCREEN' });

    try {
      const result = await getData(endpoint, params);
      dispatch({
        type: 'FETCH_DATA_SUCCESS',
        payload: result,
      });

      if (result) {
        router.replace(`/questions/${state.currentSubject.id}`);
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'FETCH_DATA_ERROR',
      });
    } finally {
      dispatch({ type: 'HIDE_LOADING_SCREEN' });
    }
  }

  async function fetchSubjectList(endpoint) {
    try {
      const result = await getData(endpoint);
      dispatch({
        type: 'FETCH_SUBJECT_LIST',
        payload: result,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'FETCH_DATA_ERROR',
      });
    }
  }

  return { fetchQuestions, fetchSubjectList };
}

export default useFetch;
