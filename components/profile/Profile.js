import { View, Text } from 'react-native';

import { styles } from './profile.styles';
import { useAppContext } from '../../context/context';

import { Button } from 'react-native-paper';

import { auth } from '../../firebase/config';
import { signOut } from 'firebase/auth';

export default function Profile() {
  const { state, dispatch } = useAppContext();

  async function signOutHandler() {
    try {
      signOut(auth);
      dispatch({ type: 'SET_USER', payload: null });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Username: {state?.user.displayName}</Text>
        <Text style={styles.text}>Email: {state?.user.email}</Text>
        <Text style={styles.text}>Games played: 20</Text>
        <Text style={styles.text}>Correct answers: 20</Text>
        <Text style={styles.text}>Wrong answers: 30</Text>
        <Text style={styles.text}>
          Average of correct answers per game: 50%
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
        <Button labelStyle={styles.btnLabel} rippleColor={undefined}>
          Delete Account
        </Button>
      </View>
    </View>
  );
}
