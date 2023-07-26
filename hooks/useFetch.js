import { getData } from '../utils/functions';
import { useAppContext } from '../context/context';

function useFetch() {
  const { dispatch } = useAppContext();

  async function fetchQuestions(endpoint, params) {
    try {
      const result = await getData(endpoint, params);
      dispatch({
        type: 'FETCH_DATA_SUCCESS',
        payload: result,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'FETCH_DATA_ERROR',
      });
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
