import { Text, View } from 'react-native';
import { Modal, Portal, Button } from 'react-native-paper';

import { styles } from './modal.styles';

import { useAppContext } from '../../context/context';
import { useRouter } from 'expo-router';

export default function ModalWindow({ visible, onDismiss }) {
  const { dispatch } = useAppContext();
  const route = useRouter();

  function leaveHandler() {
    dispatch({ type: 'CANCEL_QUIZ' });
    route.replace('/home');
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.containerStyle}
        theme={{ colors: { backdrop: 'rgba(0, 0, 0, 0.8)' } }}
      >
        <Text style={styles.title}>Are you sure you want to leave?</Text>
        <Text style={styles.text}>
          The points accumulated for this quiz will be lost!
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            mode='outlined'
            style={styles.btnLeave}
            labelStyle={styles.btnText}
            onPress={() => leaveHandler()}
          >
            Leave
          </Button>
          <Button
            mode='contained'
            style={styles.btnStay}
            labelStyle={styles.btnText}
            onPress={() => dispatch({ type: 'HIDE_MODAL' })}
          >
            Stay
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}
