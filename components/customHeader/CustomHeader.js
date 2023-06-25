import { View, Text } from 'react-native';

import { styles } from './customHeader.styles';
import HeaderIcon from '../headerIcon/HeaderIcon';
import { ICONS } from '../../constants';

export default function CustomHeader() {
  return (
    <View style={styles.container}>
      <HeaderIcon source={ICONS.menuIcon} btnWidth={30} btnHeight={20} />
      <Text style={styles.heading}>QuizMe</Text>
      <HeaderIcon
        source={ICONS.profileIcon}
        btnWidth={35}
        btnHeight={35}
        style={{ paddingTop: 12 }}
      />
    </View>
  );
}
