import Animated, { BounceInLeft, SlideOutRight } from 'react-native-reanimated';

import { styles } from './loadingScreen.styles';

import Lottie from 'lottie-react-native';
import { ANIMATIONS } from '../../constants';

import { getRandomNumber } from '../../utils/functions';

export default function LoadingScreen() {
  const random = getRandomNumber(3);

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
