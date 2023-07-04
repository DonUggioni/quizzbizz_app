import { View, Text, Image, Pressable } from 'react-native';

import { styles } from './subjectCard.styles';
import { COLORS } from '../../../constants';

import Animated, { Easing, SlideInDown } from 'react-native-reanimated';

export default function SubjectCard({ source, subject, isActive, onPress }) {
  const containerStyle = {
    ...styles.container,
    backgroundColor: isActive ? COLORS.secondary : 'transparent',
  };

  return (
    <Animated.View
      entering={SlideInDown.duration(1200).easing(
        Easing.bezier(0.38, 0.17, 0.1, 0.9)
      )}
    >
      <Pressable style={containerStyle} onPress={onPress}>
        <View style={styles.imgContainer}>
          <Image source={source} resizeMode='contain' style={styles.image} />
        </View>
        <Text style={styles.subject}>{subject}</Text>
      </Pressable>
    </Animated.View>
  );
}
