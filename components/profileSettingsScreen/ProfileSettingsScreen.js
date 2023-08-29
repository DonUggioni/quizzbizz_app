import { View, Image, TextInput } from 'react-native';

import { styles } from './profileSettingsScreen.styles';
import { useAppContext } from '../../context/context';
import { Button } from 'react-native-paper';
import { useState } from 'react';
import { COLORS } from '../../constants';
import { useRouter } from 'expo-router';

export default function ProfileSettingsScreen() {
  const { state } = useAppContext();
  const router = useRouter();
  const [username, setUsername] = useState(state.user.displayName);

  function showUsernameSaveButton() {
    if (username === state.user.displayName) {
      return true;
    } else {
      return false;
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
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <Button
            textColor={COLORS.white}
            labelStyle={styles.button}
            disabled={showUsernameSaveButton()}
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
