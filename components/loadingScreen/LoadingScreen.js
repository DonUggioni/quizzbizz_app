import { View } from 'react-native';

import { styles } from './loadingScreen.styles';

import Lottie from 'lottie-react-native';
import { ANIMATIONS } from '../../constants';

export default function LoadingScreen() {
  function getRandomNumber() {
    return Math.floor(Math.random() * 3) + 1;
  }

  const random = getRandomNumber();

  return (
    <View style={styles.container}>
      <Lottie
        source={ANIMATIONS[`loading-${random}`]}
        style={styles.animationSize}
        autoPlay
        loop={true}
        speed={1}
      />
    </View>
  );
}
