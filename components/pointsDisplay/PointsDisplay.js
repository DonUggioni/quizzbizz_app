import { View, Text } from 'react-native';

import { styles } from './pointsDisplay.styles';

export default function PointsDisplay() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Total points</Text>
      <Text style={styles.points}>2490</Text>
    </View>
  );
}
