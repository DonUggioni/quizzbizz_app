import { useState } from 'react';
import { View, Image, TextInput, Keyboard } from 'react-native';
import { styles } from './profileSettingsScreen.styles';
import { useAppContext } from '../../context/context';
import ProgressBarModal from './ProgressBar/ProgressBar';
import { Button, PaperProvider, Portal, Snackbar } from 'react-native-paper';
import { COLORS } from '../../constants';
import { useRouter } from 'expo-router';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/config';
import usePickImage from '../../hooks/usePickImage';

export default function ProfileSettingsScreen() {
  const { state, dispatch } = useAppContext();
  const { pickImage, uploadProgress } = usePickImage();
  const router = useRouter();
  const [displayName, setDisplayName] = useState(state.user.displayName);

  const onDismissSnackBar = () => dispatch({ type: 'HIDE_SNACKBAR' });

  async function saveUsernameHandler() {
    dispatch({ type: 'SHOW_LOADING_SCREEN' });
    Keyboard.dismiss();
    try {
      updateProfile(auth.currentUser, {
        displayName: displayName,
      });
    } catch (error) {
      console.log('Could not upload profile', error.message);
    } finally {
      dispatch({ type: 'HIDE_LOADING_SCREEN' });
      dispatch({
        type: 'SHOW_SNACKBAR',
        payload: 'Username updated successfully.',
      });
    }
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <ProgressBarModal
          progress={uploadProgress / 100}
          visible={state.modalVisible}
        />
        <Portal>
          <Snackbar
            visible={state.snackBar.isVisible}
            onDismiss={onDismissSnackBar}
            duration={2000}
            wrapperStyle={styles.snackBarPosition}
            style={styles.snackBarStyling}
          >
            {state.snackBar.message}
          </Snackbar>
        </Portal>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: state.user.photoURL }}
            resizeMode='cover'
            style={styles.avatar}
          />
          <Button
            labelStyle={styles.button}
            textColor={COLORS.white}
            onPress={pickImage}
          >
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
    </PaperProvider>
  );
}
