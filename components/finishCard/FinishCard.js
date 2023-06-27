import { View, Text } from 'react-native';
import { styles } from './finishCard.styles';

import { ANIMATIONS } from '../../constants';
import Lottie from 'lottie-react-native';

export default function FinishCard() {
  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <Lottie
          source={ANIMATIONS.throphyAnimation}
          style={styles.animationSize}
          autoPlay
          loop={false}
          speed={1}
        />
        <View style={styles.pointsContainer}>
          <Text style={styles.heading}>Congratulations!</Text>
          <Text style={styles.text}>
            Score: <Text style={styles.highlightOrange}>300pts</Text>
          </Text>
        </View>
        <View style={styles.paddingBottom}>
          <Text style={styles.text}>
            You got <Text style={styles.highlightOrange}>80%</Text> right out of{' '}
            <Text style={styles.highlightBlue}>15</Text> questions.
          </Text>
        </View>
      </View>
    </View>
  );
}
