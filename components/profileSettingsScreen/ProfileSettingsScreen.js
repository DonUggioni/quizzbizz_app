import { useState } from 'react';
import { View, Image, TextInput } from 'react-native';
import { styles } from './profileSettingsScreen.styles';
import { useAppContext } from '../../context/context';
import { Button } from 'react-native-paper';
import { COLORS } from '../../constants';
import { useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { db, auth } from '../../firebase/config';

export default function ProfileSettingsScreen() {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const [displayName, setDisplayName] = useState(state.user.displayName);

  async function saveUsernameHandler() {
    dispatch({ type: 'SHOW_LOADING_SCREEN' });
    try {
      updateProfile(auth.currentUser, {
        displayName: displayName,
      });
    } catch (error) {
      console.log('Could not upload profile', error.message);
      dispatch({});
    } finally {
      dispatch({ type: 'HIDE_LOADING_SCREEN' });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: state.photoURL }}
          resizeMode='cover'
          style={styles.avatar}
        />
        <Button labelStyle={styles.button} textColor={COLORS.white}>
          Update avatar
        </Button>
        <View style={styles.usernameContainer}>
          <TextInput
            style={styles.input}
            value={displayName}
            onChangeText={(text) => setDisplayName(text)}
          />
          <Button
            textColor={COLORS.white}
            labelStyle={styles.button}
            disabled={displayName === state.user.displayName ? true : false}
            onPress={() => saveUsernameHandler()}
            loading={state.isLoading}
          >
            Save
          </Button>
        </View>
      </View>
      <Button
        mode='contained'
        style={styles.doneButton}
        labelStyle={[styles.button, styles.semiBold]}
        onPress={() => router.back()}
      >
        Done
      </Button>
    </View>
  );
}
