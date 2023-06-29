import { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';

import { styles } from './subjectCard.styles';
import { COLORS } from '../../../constants';

// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated';

export default function SubjectCard({ source, subject, isActive, onPress }) {
  const translateY = new Animated.Value(400);
  const opacity = new Animated.Value(0);

  const animatedStyle = {
    transform: [
      {
        translateY: translateY,
      },
    ],
    opacity: opacity,
  };

  const containerStyle = {
    ...styles.container,
    backgroundColor: isActive ? COLORS.secondary : 'transparent',
  };

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();

    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  }, []);

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity style={containerStyle} onPress={onPress}>
        <View style={styles.imgContainer}>
          <Image source={source} resizeMode='contain' style={styles.image} />
        </View>
        <Text style={styles.subject}>{subject}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
