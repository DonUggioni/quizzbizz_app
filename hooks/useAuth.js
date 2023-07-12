import { useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { makeRedirectUri } from 'expo-auth-session';
import { IOS_CLIENT_ID, ANDROID_CLIENT_ID } from '@env';
import { useAppContext } from '../context/context';
import * as Google from 'expo-auth-session/providers/google';

import { auth, db } from '../firebase/config';

function useAuth() {
  const { state, dispatch } = useAppContext();
  const [error, setError] = useState({
    hasError: false,
    errorMessage: '',
  });

  const userData = {
    userPreferences: state?.userPreferences,
    totalPoints: state?.totalPoints,
    correctAnswers: state?.correctAnswers,
    wrongAnswers: state?.wrongAnswers,
    gamesPlayed: state?.gamesPlayed,
  };

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    redirectUri: makeRedirectUri({ scheme: 'com.quizapp' }),
  });

  const createUser = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log('user created');
      dispatch({ type: 'SET_USER', payload: user });
    } catch (error) {
      console.log('error:', error.message);
      setError({ ...error, hasError: true, errorMessage: error.message });
    }
  };

  const signinUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log('user signedin');
      dispatch({ type: 'SET_USER', payload: user });
    } catch (error) {
      console.log('error:', error.message);
      setError({ ...error, hasError: true, errorMessage: error.message });
    }
  };

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, user.uid, user.email);
        const docSnap = await getDoc(docRef);

        console.log('user created');
        dispatch({ type: 'SET_USER', payload: user });

        if (docSnap.exists()) {
          const data = docSnap.data();
          dispatch({
            type: 'SET_USER_INFO',
            payload: data,
          });
        } else {
          console.log('set new doc');
          await setDoc(doc(db, user.uid, user.email), userData);
        }
      } else {
        console.log('No user');
      }
    });

    return () => unsub();
  }, [state?.user]);

  return { promptAsync, error, createUser, signinUser };
}

export default useAuth;
