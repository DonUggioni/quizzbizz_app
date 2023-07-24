import { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, db } from '../firebase/config';

import { useAppContext } from '../context/context';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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

  //   useEffect(() => {
  //     const unsub = onAuthStateChanged(auth, async (user) => {
  //       if (user) {
  //         const docRef = doc(db, user.uid, user.email);
  //         const docSnap = await getDoc(docRef);

  //         console.log('user logged in');

  //         if (docSnap.exists()) {
  //           console.log('doc data', docSnap.data());
  //         } else {
  //           console.log('set new doc');
  //           await setDoc(doc(db, user.uid, user.email), userData);
  //         }
  //       } else {
  //         console.log('user logged out');
  //       }
  //     });

  //     return () => unsub();
  //   }, []);

  return { error, createUser, signinUser };
}

export default usePasswordAuth;
