import { View, Text } from 'react-native';

import { styles } from './profile.styles';
import { useAppContext } from '../../context/context';

import { Button } from 'react-native-paper';

import { auth } from '../../firebase/config';
import { signOut, deleteUser } from 'firebase/auth';

import { useRouter } from 'expo-router';
import { calculateAveragePercentage } from '../../utils/functions';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const router = useRouter();
  const { state, dispatch } = useAppContext();

  const averageOfCorrectAnswers = calculateAveragePercentage(
    state?.totalCorrectAnswers,
    state?.totalWrongAnswers
  );

  async function signOutHandler() {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('@QuizMeData');
      router.replace('/home');
      dispatch({ type: 'SIGN_OUT' });
      dispatch({ type: 'RESTART' });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteUserHandler() {
    try {
      await deleteUser(auth.currentUser);
      await AsyncStorage.removeItem('@QuizMeData');
      router.replace('/home');
      dispatch({ type: 'SIGN_OUT' });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Username: {state?.user.displayName}</Text>
        <Text style={styles.text}>Email: {state?.user.email}</Text>
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
