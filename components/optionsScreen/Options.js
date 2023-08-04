import { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';

import Selector from './selector/Selector';

import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

import { styles } from './options.styles';
import { COLORS } from '../../constants';
import {
  DIFFICULTY_OPTIONS,
  NUM_OF_QUESTIONS_OPTIONS,
  BACKGROUND_MUSIC_OPTIONS,
  SOUND_EFFECTS_OPTIONS,
} from '../../utils/optionsData';

import { useRouter } from 'expo-router';

import { useAppContext } from '../../context/context';
import { capitalizeFirstChar } from '../../utils/functions';

export default function Options() {
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  const [userSettings, setUserSettings] = useState({
    difficulty: state?.userPreferences.difficulty,
    numOfQuestions: state?.userPreferences.numOfQuestions,
    backgroundMusic: state.userPreferences.backgroundMusic,
    soundEffects: state.userPreferences.soundEffects,
  });
  const [isSaving, setIsSaving] = useState(false);

  // This function is recieving the data coming from the "Selector" component, this way, you can updated the app state from here by pressing the Save button and dispatching an action
  function onSelect(data) {
    switch (data.category) {
      case 'difficulty':
        return setUserSettings({ ...userSettings, difficulty: data.text });

      case 'numOfQuestions':
        return setUserSettings({ ...userSettings, numOfQuestions: data.text });
      case 'backgroundMusic':
        return setUserSettings({ ...userSettings, backgroundMusic: data.text });
      case 'soundEffects':
        return setUserSettings({ ...userSettings, soundEffects: data.text });
      default:
        return userSettings;
    }
  }

  async function saveHandler() {
    setIsSaving(true);
    dispatch({ type: 'UPDATE_USER_PREFERENCES', payload: userSettings });

    try {
      await setDoc(
        doc(db, state?.user.uid, state?.user.email),
        {
          userPreferences: userSettings,
        },
        { merge: true }
      );
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsSaving(false);
      router.back();
    }
  }

  if (state.user === null) {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.btnText}>
          Must be logged in to change the settings.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Selector
          data={DIFFICULTY_OPTIONS}
          title={'Select a default question difficulty level'}
          onSelected={onSelect}
          currentValue={
            state?.userPreferences.difficulty !== null &&
            capitalizeFirstChar(state?.userPreferences.difficulty)
          }
        />
        <Selector
          data={NUM_OF_QUESTIONS_OPTIONS}
          title={'Select the number of questions per game'}
          onSelected={onSelect}
          currentValue={state?.userPreferences.numOfQuestions}
        />
        <Selector
          data={BACKGROUND_MUSIC_OPTIONS}
          title={'Background music'}
          onSelected={onSelect}
          currentValue={capitalizeFirstChar(
            state?.userPreferences.backgroundMusic
          )}
        />
        <Selector
          data={SOUND_EFFECTS_OPTIONS}
          title={'Sound effects'}
          onSelected={onSelect}
          currentValue={capitalizeFirstChar(
            state?.userPreferences.soundEffects
          )}
        />
      </ScrollView>
      <View style={styles.btnContainer}>
        <Button
          style={styles.btn}
          mode='outlined'
          labelStyle={styles.btnText}
          onPress={() => router.back()}
          rippleColor={'transparent'}
        >
          Cancel
        </Button>
        <Button
          style={styles.btn}
          mode='contained'
          theme={{ colors: { primary: COLORS.orange } }}
          labelStyle={styles.btnText}
          rippleColor={'transparent'}
          onPress={() => saveHandler()}
          loading={isSaving}
        >
          Save
        </Button>
      </View>
    </View>
  );
}
