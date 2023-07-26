import { View } from 'react-native';

import Lottie from 'lottie-react-native';
import { ANIMATIONS } from '../../constants';
import { styles } from './splashScreen.styles';
import { StatusBar } from 'expo-status-bar';

export default function SplashScreen({ setIsLoading }) {
  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <Lottie
        source={ANIMATIONS.splashAnimation}
        style={styles.animationSize}
        autoPlay
        loop={false}
        speed={0.8}
        onAnimationFinish={() => setIsLoading(false)}
      />
    </View>
  );
}
