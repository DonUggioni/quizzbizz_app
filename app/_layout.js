import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import ContextProvider from '../context/context';

import { SplashScreen } from '../components';

import useFetch from '../hooks/useFetch';

import { useAppContext } from '../context/context';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { generateRandomUsername } from '../utils/functions';
import { StatusBar } from 'expo-status-bar';

import { DUMMY_AVATAR_URL } from '../utils/defaults';

function RootApp() {
  const { state, dispatch } = useAppContext();
  const { fetchSubjectList } = useFetch();
  const [isLoading, setIsLoading] = useState(true);
  const randomUsername = generateRandomUsername();

  let userData = {
    userPreferences: state?.userPreferences,
    totalPoints: state?.totalPoints,
    totalCorrectAnswers: state?.totalCorrectAnswers,
    totalWrongAnswers: state?.totalWrongAnswers,
    gamesPlayed: state?.gamesPlayed,
    serverTimestamp: serverTimestamp(),
    displayName: randomUsername,
    photoURL: DUMMY_AVATAR_URL,
  };

  useEffect(() => {
    if (state.subjectList.length > 0) return;

    fetchSubjectList('api_category.php');
  }, []);

  useEffect(() => {
    if (state?.user !== null) return;

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
        } else {
          userData = {
            ...userData,
            displayName: user.displayName,
            photoURL: user.photoURL,
          };
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

    return () => unsub();
  }, [state.user]);

  return (
    <>
      <StatusBar style='light' />

      {isLoading ? (
        <SplashScreen setIsLoading={setIsLoading} />
      ) : (
        <Stack initialRouteName='home'>
          <Stack.Screen name='home' />
        </Stack>
      )}
    </>
  );
}

export default function Layout() {
  const [fontsLoaded] = useFonts({
    JostRegular: require('../assets/fonts/Jost-Regular.ttf'),
    JostSemiBold: require('../assets/fonts/Jost-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ContextProvider>
      <RootApp />
    </ContextProvider>
  );
}
