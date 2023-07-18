import { useEffect } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';

import { COLORS } from '../constants';
import { CustomHomeHeader, SubjectList } from '../components';
import { PaperProvider } from 'react-native-paper';

import { StatusBar } from 'expo-status-bar';

import { useAppContext } from '../context/context';

import useGetTotalPoints from '../hooks/useGetTotalPoints';

export default function Home() {
  const { state } = useAppContext();
  const { userCredentials } = useGetTotalPoints();

  useEffect(() => {
    if (state?.totalPoints > 0) return console.log('returned');

    userCredentials();
  }, []);

  return (
    <PaperProvider>
      <StatusBar style='light' />
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
