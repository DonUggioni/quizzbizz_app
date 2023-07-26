import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

import { useAppContext } from '../context/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { generateRandomUsername } from '../utils/functions';

const DUMMY_AVATAR_URL = 'https://i.pravatar.cc/100';

function useFetchUserData() {
  const { state, dispatch } = useAppContext();
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

  const unsub = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const docRef = doc(db, user.uid, user.email);
      const docSnap = await getDoc(docRef);
      const userInfo = {
        uid: user.uid,
        email: user.email,
      };

      dispatch({ type: 'SET_USER', payload: user });

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
    } else {
      console.log('No user');
    }
  });

  return { unsub };
}

export default useFetchUserData;
