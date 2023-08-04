import { useEffect } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { COLORS } from '../constants';
import { CustomHomeHeader, SubjectList } from '../components';
import { PaperProvider } from 'react-native-paper';
import { getRandomNumber } from '../utils/functions';
import { useAppContext } from '../context/context';

import { trackEvent } from '@aptabase/react-native';

import useSound from '../hooks/useSound';

import { SOUNDS } from '../constants';

export default function Home() {
  trackEvent('homepage_visited');
  const { playMusic, stopMusic } = useSound();
  const { state } = useAppContext();

  const randomNumber = getRandomNumber(3);

  useEffect(() => {
    if (state.userPreferences.backgroundMusic === 'off') {
      stopMusic();
    }

    if (state.currentMusic !== null) return;

    playMusic(SOUNDS[`ambientMusic-${randomNumber}`]);
  }, [state.userPreferences.backgroundMusic]);

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
