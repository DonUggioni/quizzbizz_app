import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase/config';

import { useAppContext } from '../context/context';

function usePasswordAuth() {
  const { state, dispatch } = useAppContext();
  const [error, setError] = useState({
    hasError: false,
    errorMessage: '',
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

  return { error, createUser, signinUser };
}

export default usePasswordAuth;
