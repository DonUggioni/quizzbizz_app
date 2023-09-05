import { View, Text } from 'react-native';
import { ProgressBar, PaperProvider, Portal, Modal } from 'react-native-paper';
import { styles } from './progressBar.styles';
import { COLORS } from '../../../constants';

export default function ProgressBarModal({ progress, visible }) {
  return (
    <Portal>
      <Modal contentContainerStyle={styles.container} visible={visible}>
        <View style={styles.modal}>
          <ProgressBar
            progress={progress}
            color={COLORS.green}
            style={styles.progressBar}
          />
          <Text style={styles.text}>Uploading...</Text>
        </View>
      </Modal>
    </Portal>
  );
}
