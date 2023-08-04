import { Audio } from 'expo-av';
import { useAppContext } from '../context/context';

function useSound() {
  const { state, dispatch } = useAppContext();

  async function playMusic(music) {
    if (state.userPreferences.backgroundMusic === 'off') return;

    try {
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync(music, {
        shouldPlay: true,
        isLooping: true,
      });

      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        await sound.setPositionAsync(0);
        await sound.playAsync();
        dispatch({ type: 'SET_CURRENT_MUSIC', payload: sound });
      } else {
        console.log('Sound is not loaded');
      }
    } catch (error) {
      console.error('Error playing music:', error);
    }
  }

  async function playSoundEffect(soundEffect) {
    if (state.userPreferences.soundEffects === 'off') return;

    try {
      const { sound } = await Audio.Sound.createAsync(soundEffect, {
        shouldPlay: true,
      });

      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (!status.didJustFinish) return;
        await sound.unloadAsync();
      });

      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        await sound.playAsync();
      } else {
        console.log('Sound is not loaded');
      }
    } catch (error) {
      console.error('Error playing sound effect:', error);
    }
  }

  async function stopMusic() {
    if (state.currentMusic !== null) {
      try {
        await state.currentMusic.stopAsync();
        await state.currentMusic.unloadAsync();
        dispatch({ type: 'SET_CURRENT_MUSIC', payload: null });
      } catch (error) {
        console.error('Error stopping sound:', error);
      }
    }
  }

  return { playMusic, playSoundEffect, stopMusic };
}

export default useSound;
