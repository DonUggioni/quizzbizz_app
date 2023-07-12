import { useEffect } from 'react';

import { View } from 'react-native';
import { Stack } from 'expo-router';

import { COLORS } from '../constants';
import { CustomHomeHeader, SubjectList } from '../components';
import { PaperProvider } from 'react-native-paper';

import { useAppContext } from '../context/context';

import { auth } from '../firebase/config';

export default function Home() {
  const { dispatch } = useAppContext();

  function getCurrentUser() {
    const user = auth.currentUser;

    if (user) {
      dispatch({ type: 'SET_USER', payload: user });
    } else {
      console.log('no user');
    }
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <PaperProvider>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.primary,
          paddingHorizontal: 24,
        }}
      >
        <Stack.Screen
          options={{
            header: () => {
              return <CustomHomeHeader />;
            },
          }}
        />

        <SubjectList />
      </View>
    </PaperProvider>
  );
}
