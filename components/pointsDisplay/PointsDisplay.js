import { Text } from 'react-native';

import Animated, { Easing, SlideInUp } from 'react-native-reanimated';

import { styles } from './pointsDisplay.styles';

import { useAppContext } from '../../context/context';

export default function PointsDisplay() {
  const { state } = useAppContext();
  return (
    <Animated.View
      style={styles.container}
      entering={SlideInUp.duration(1200).easing(
        Easing.bezier(0.38, 0.17, 0.1, 0.9)
      )}
    >
      <Text style={styles.heading}>Total points</Text>
      <Text style={styles.points}>{state.totalPoints}</Text>
    </Animated.View>
  );
}
