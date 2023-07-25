import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  GoogleAuthProvider,
  signInWithCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';

import { IOS_CLIENT_ID, ANDROID_CLIENT_ID } from '@env';

import { auth } from '../firebase/config';

import { useRouter } from 'expo-router';

import { useAppContext } from '../context/context';

function useAuth() {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const [error, setError] = useState({
    hasError: false,
    errorMessage: '',
  });

  const [_, googleResponse, googlePromptAsync] = Google.useAuthRequest({
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
  });

  // const [request, facebookResponse, facebookPromptAsync] =
  //   Facebook.useAuthRequest({
  //     clientId: FACEBOOK_CLIENT_ID,
  //   });

  useEffect(() => {
    if (googleResponse?.type === 'success') {
      const { id_token } = googleResponse.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [googleResponse]);

  // useEffect(() => {
  //   if (facebookResponse?.type === 'success') {
  //     const { id_token } = facebookResponse.params;
  //     const credential = FacebookAuthProvider.credential(id_token);
  //     signInWithCredential(auth, credential);
  //   }
  // }, [facebookResponse]);

  const createUser = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('user created');
      router.replace('/home');
    } catch (error) {
      console.log('error:', error.message);
      dispatch({ type: 'SHOW_ERROR', payload: error.message });
    }
  };

  const signinUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('user signedin');
      router.replace('/home');
    } catch (error) {
      console.log('error:', error.message);
      dispatch({ type: 'SHOW_ERROR', payload: error.message });
    }
  };

  return {
    googlePromptAsync,
    error,
    createUser,
    signinUser,
  };
}

export default useAuth;
