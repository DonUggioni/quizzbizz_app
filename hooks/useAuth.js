import { useEffect, useState } from 'react';

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import * as Google from 'expo-auth-session/providers/google';

import { makeRedirectUri } from 'expo-auth-session';
import { IOS_CLIENT_ID, ANDROID_CLIENT_ID } from '@env';
import { useAppContext } from '../context/context';

import { auth, db } from '../firebase/config';
import { generateRandomUsername } from '../utils/functions';

import { useRouter } from 'expo-router';

import AsyncStorage from '@react-native-async-storage/async-storage';

const DUMMY_AVATAR_URL = 'https://i.pravatar.cc/100';

function useAuth() {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const [error, setError] = useState({
    hasError: false,
    errorMessage: '',
  });
  const randomUsername = generateRandomUsername();

  const userData = {
    userPreferences: state?.userPreferences,
    totalPoints: state?.totalPoints,
    totalCorrectAnswers: state?.totalCorrectAnswers,
    totalWrongAnswers: state?.totalWrongAnswers,
    gamesPlayed: state?.gamesPlayed,
    serverTimestamp: serverTimestamp(),
    displayName: state?.displayName ? state?.displayName : randomUsername,
    photoURL: state?.photoURL ? state?.photoURL : DUMMY_AVATAR_URL,
  };

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    redirectUri: makeRedirectUri({ scheme: 'com.quizapp' }),
  });

  const createUser = async (email, password) => {
    dispatch({ type: 'SHOW_LOADING_SCREEN' });

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
    } finally {
      dispatch({ type: 'HIDE_LOADING_SCREEN' });
    }
  };

  const signinUser = async (email, password) => {
    dispatch({ type: 'SHOW_LOADING_SCREEN' });

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
    } finally {
      dispatch({ type: 'HIDE_LOADING_SCREEN' });
    }
  };

  useEffect(() => {
    dispatch({ type: 'SHOW_LOADING_SCREEN' });

    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
      dispatch({ type: 'HIDE_LOADING_SCREEN' });
    }
  }, [response]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      dispatch({ type: 'SHOW_LOADING_SCREEN' });

      if (user) {
        const docRef = doc(db, user.uid, user.email);
        const docSnap = await getDoc(docRef);
        const userInfo = {
          uid: user.uid,
          email: user.email,
        };

        dispatch({
          type: 'SET_USER',
          payload: user,
        });

        // Storing basic user info in local storage to retrieve on reload
        try {
          const userData = JSON.stringify(userInfo);
          await AsyncStorage.setItem('@QuizMeData', userData);
        } catch (error) {
          console.log(error);
        }

        // Checking if there is a display name, if not, a random one will be set.
        if (!user.displayName) {
          try {
            updateProfile(auth.currentUser, {
              displayName: randomUsername,
            });
            console.log('username created');
          } catch (error) {
            console.log('display name error', error.message);
          }
        }

        // Checking if user info exists on DB, if not, it will be created.
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
        dispatch({ type: 'HIDE_LOADING_SCREEN' });
      } else {
        console.log('No user');
        // dispatch({ type: 'HIDE_LOADING_SCREEN' });
      }
    });
    dispatch({ type: 'HIDE_LOADING_SCREEN' });

    return () => unsub();
  }, [state?.user]);

  return { promptAsync, error, createUser, signinUser };
}

export default useAuth;
