import { useEffect } from 'react';
import {
  GoogleAuthProvider,
  signInWithCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import { auth } from '../firebase/config';
import { useAppContext } from '../context/context';

function useAuth() {
  const { dispatch } = useAppContext();

  const [_, googleResponse, googlePromptAsync] = Google.useAuthRequest({
    iosClientId: `${process.env.IOS_CLIENT_ID}`,
    androidClientId: `${process.env.ANDROID_CLIENT_ID}`,
  });

  useEffect(() => {
    if (googleResponse?.type === 'success') {
      const { id_token } = googleResponse.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [googleResponse]);

  const createUser = async (email, password) => {
    dispatch({ type: 'SHOW_LOADING_SCREEN' });
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      dispatch({ type: 'SET_USER', payload: user.user });
    } catch (error) {
      console.log('error:', error.message);
      dispatch({ type: 'SHOW_MESSAGE', payload: error.message });
    } finally {
      setTimeout(() => {
        dispatch({ type: 'HIDE_LOADING_SCREEN' });
      }, 2000);
    }
  };

  const signinUser = async (email, password) => {
    dispatch({ type: 'SHOW_LOADING_SCREEN' });
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log('error:', error.message);
      dispatch({ type: 'SHOW_MESSAGE', payload: error.message });
    } finally {
      setTimeout(() => {
        dispatch({ type: 'HIDE_LOADING_SCREEN' });
      }, 2000);
    }
  };

  return {
    googlePromptAsync,
    createUser,
    signinUser,
  };
}

export default useAuth;
