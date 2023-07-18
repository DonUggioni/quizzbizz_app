import { useMemo, useEffect, useState } from 'react';

import { useAppContext } from '../context/context';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

function useGetTotalPoints() {
  const { dispatch, state } = useAppContext();
  const [credentials, setCredentials] = useState(null);

  const userCredentials = useMemo(() => {
    return async function getCredentialsFromLocalStorage() {
      try {
        const data = await AsyncStorage.getItem('@QuizMeData');
        if (data !== null) {
          setCredentials(JSON.parse(data));
          dispatch({ type: 'SET_USER', payload: JSON.parse(data) });
          return data;
        } else {
          return null;
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    };
  }, []);

  useEffect(() => {
    async function fetchDataFromFirebase() {
      if (credentials !== null) {
        console.log('hello from useEffect');
        const docRef = doc(db, credentials?.uid, credentials?.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          dispatch({
            type: 'SET_USER_INFO',
            payload: data,
          });
        }
      }
    }

    fetchDataFromFirebase();
  }, [credentials]);

  return { userCredentials };
}

export default useGetTotalPoints;
