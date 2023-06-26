import { View, Text, Image, TouchableOpacity } from 'react-native';

import { styles } from './subjectCard.styles';
import { COLORS } from '../../../constants';

export default function SubjectCard({ source, subject, isActive, onPress }) {
  const containerStyle = {
    ...styles.container,
    backgroundColor: isActive ? COLORS.secondary : 'transparent',
  };

  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <View style={styles.imgContainer}>
        <Image source={source} resizeMode='contain' style={styles.image} />
      </View>
      <Text style={styles.subject}>{subject}</Text>
    </TouchableOpacity>
  );
}
