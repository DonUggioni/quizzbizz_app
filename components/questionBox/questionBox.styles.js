import { StyleSheet } from 'react-native';
import { COLORS, FONT, MARGIN, SIZES } from '../../constants';

export const styles = StyleSheet.create({
  questionBox: {
    width: '100%',
    marginTop: MARGIN.large,
    height: 100,
    justifyContent: 'center',
    marginBottom: MARGIN.large,
  },
  questionText: {
    color: COLORS.white,
    fontFamily: FONT.regular,
    letterSpacing: 0.5,
    fontSize: SIZES.large,
  },
});
