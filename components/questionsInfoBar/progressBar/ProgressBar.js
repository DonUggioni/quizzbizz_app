import { View } from 'react-native';

import { styles } from './progressBar.styles';

export default function ProgressBar({ progressBarWidth }) {
  return (
    <View style={styles.container}>
      <View style={styles.bar(`${progressBarWidth}%`)} />
    </View>
  );
}
