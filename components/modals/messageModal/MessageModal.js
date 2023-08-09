import { Text, View } from 'react-native';
import { Modal, Portal, Button } from 'react-native-paper';
import { styles } from './messageModal.styles';
import { useAppContext } from '../../../context/context';
import { translateFirebaseError } from '../../../utils/functions';

export default function MessageModal({ visible, onDismiss }) {
  const { state, dispatch } = useAppContext();

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.containerStyle}
        theme={{ colors: { backdrop: 'rgba(0, 0, 0, 0.8)' } }}
      >
        <Text style={styles.title}>Oops!</Text>
        <Text style={styles.text}>
          {translateFirebaseError(state.error.message)}
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            mode='contained'
            style={styles.btnStay}
            labelStyle={styles.btnText}
            onPress={() => dispatch({ type: 'HIDE_MESSAGE' })}
          >
            Okay!
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}
