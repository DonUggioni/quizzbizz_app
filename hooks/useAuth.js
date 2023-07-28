import { useEffect } from 'react';
import {
  GoogleAuthProvider,
  signInWithCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import { auth } from '../firebase/config';
import { useRouter } from 'expo-router';
import { useAppContext } from '../context/context';

function useAuth() {
  const { dispatch } = useAppContext();
  const router = useRouter();

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
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      router.replace('/home');
      dispatch({ type: 'SET_USER', payload: user.user });
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
    createUser,
    signinUser,
  };
}

export default useAuth;
