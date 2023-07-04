import { View } from 'react-native';
import Animated, { BounceInLeft, SlideOutRight } from 'react-native-reanimated';

import { styles } from './loadingScreen.styles';

import Lottie from 'lottie-react-native';
import { ANIMATIONS } from '../../constants';

export default function LoadingScreen() {
  function getRandomNumber() {
    return Math.floor(Math.random() * 3) + 1;
  }

  const random = getRandomNumber();

  return (
    <Animated.View
      style={styles.container}
      entering={BounceInLeft}
      exiting={SlideOutRight}
    >
      <Lottie
        source={ANIMATIONS[`loading-${random}`]}
        style={styles.animationSize}
        autoPlay
        loop={true}
        speed={1}
      />
    </Animated.View>
  );
}
