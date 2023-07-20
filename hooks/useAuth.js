import { useEffect, useState } from 'react';

import {
  GoogleAuthProvider,
  signInWithCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';

import { makeRedirectUri } from 'expo-auth-session';
import { IOS_CLIENT_ID, ANDROID_CLIENT_ID } from '@env';
import { useAppContext } from '../context/context';

import { auth } from '../firebase/config';

import { useRouter } from 'expo-router';

function useAuth() {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const [error, setError] = useState({
    hasError: false,
    errorMessage: '',
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    redirectUri: makeRedirectUri({ scheme: 'com.quizapp' }),
  });

  console.log(response);

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  const createUser = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('user created');
      router.replace('/home');
    } catch (error) {
      console.log('error:', error.message);
      setError({ ...error, hasError: true, errorMessage: error.message });
    }
  };

  const signinUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('user signedin');
      router.replace('/home');
      dispatch({ type: 'SET_USER', payload: user });
    } catch (error) {
      console.log('error:', error.message);
      setError({ ...error, hasError: true, errorMessage: error.message });
    }
  };

  return { promptAsync, error, createUser, signinUser };
}

export default useAuth;
