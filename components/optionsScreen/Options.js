import { View } from 'react-native';
import { Button } from 'react-native-paper';

import Selector from './selector/Selector';

import { styles } from './options.styles';
import { COLORS } from '../../constants';
import {
  DIFFICULTY_OPTIONS,
  NUM_OF_QUESTIONS_OPTIONS,
} from '../../utils/optionsData';

import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function Options() {
  const router = useRouter();
  const [userSettings, setUserSettings] = useState({
    difficulty: '',
    numOfQuestions: '',
  });

  // This function is recieving the data coming from the "Selector" component, this way, you can updated the app state from here by pressing the Save button and dispatching an action
  function onSelect(data) {
    switch (data.category) {
      case 'difficulty':
        setUserSettings({ ...userSettings, difficulty: data.text });
        break;
      case 'numOfQuestions':
        setUserSettings({ ...userSettings, numOfQuestions: data.text });
      default:
        return userSettings;
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Selector
          data={DIFFICULTY_OPTIONS}
          title={'Select a default difficulty level'}
          onSelected={onSelect}
        />
        <Selector
          data={NUM_OF_QUESTIONS_OPTIONS}
          title={'Select the number of questions per game'}
          onSelected={onSelect}
        />
      </View>
      <View style={styles.btnContainer}>
        <Button
          style={styles.btn}
          mode='outlined'
          labelStyle={styles.btnText}
          onPress={() => router.replace('/home')}
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
        >
          Save
        </Button>
      </View>
    </View>
  );
}
