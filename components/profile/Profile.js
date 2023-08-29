import { View, Text } from 'react-native';

import { styles } from './profile.styles';
import { useAppContext } from '../../context/context';

import { Button } from 'react-native-paper';

import { auth } from '../../firebase/config';
import { signOut, deleteUser } from 'firebase/auth';

import { useRouter } from 'expo-router';
import { calculateAveragePercentage } from '../../utils/functions';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../constants';

export default function Profile() {
  const router = useRouter();
  const { state, dispatch } = useAppContext();

  const averageOfCorrectAnswers = calculateAveragePercentage(
    state?.totalCorrectAnswers,
    state?.totalWrongAnswers
  );

  async function signOutHandler() {
    dispatch({ type: 'SHOW_LOADING_SCREEN' });
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('@QuizMeData');
      router.replace('/home');
      dispatch({ type: 'SIGN_OUT' });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: 'HIDE_LOADING_SCREEN' });
    }
  }

  async function deleteUserHandler() {
    dispatch({ type: 'SHOW_LOADING_SCREEN' });

    try {
      await deleteUser(auth.currentUser);
      await AsyncStorage.removeItem('@QuizMeData');
      dispatch({ type: 'SIGN_OUT' });
    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch({ type: 'HIDE_LOADING_SCREEN' });
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.usernameContainer}>
          <View>
            <Text style={styles.text}>
              Hello,{' '}
              {state?.displayName ? state.displayName : state.user.displayName}
            </Text>
          </View>
          <Button
            icon={'pencil'}
            contentStyle={styles.text}
            textColor={COLORS.white}
            onPress={() => router.push('/profileSettings')}
          >
            Edit
          </Button>
        </View>

        <Text style={styles.heading}>Your stats</Text>
        <Text style={styles.text}>Games played: {state?.gamesPlayed}</Text>
        <Text style={styles.text}>
          Correct answers: {state?.totalCorrectAnswers}
        </Text>
        <Text style={styles.text}>
          Wrong answers: {state?.totalWrongAnswers}
        </Text>
        <Text style={styles.text}>
          Average of correct answers: {averageOfCorrectAnswers}%
        </Text>
      </View>

      <View style={styles.btnContainer}>
        <Button
          mode='contained'
          style={styles.signoutBtn}
          labelStyle={styles.btnLabel}
          onPress={() => signOutHandler()}
        >
          Sign out
        </Button>
        <Button
          labelStyle={styles.btnLabel}
          rippleColor={undefined}
          onPress={() => deleteUserHandler()}
        >
          Delete Account
        </Button>
      </View>
    </View>
  );
}
