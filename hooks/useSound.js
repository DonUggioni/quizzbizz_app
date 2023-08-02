import { useState } from 'react';
import { Audio } from 'expo-av';
import { useAppContext } from '../context/context';

function useSound() {
  const { state } = useAppContext();
  const [sound, setSound] = useState(null);

  async function playMusic(music) {
    if (state.music === false) return;

    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(music, {
      shouldPlay: true,
      isLooping: true,
    });
    setSound(sound);

    console.log('Playing Sound');
    await sound.setPositionAsync(0);
    await sound.playAsync();
  }

  async function playSoundEffect(soundEffect) {
    if (state.soundEffects === false) return;

    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(soundEffect, {
      shouldPlay: true,
    });
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  async function stopSound() {
    if (sound) {
      console.log('Stopping Sound');
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
  }

  return { playMusic, playSoundEffect, stopSound };
}

export default useSound;
