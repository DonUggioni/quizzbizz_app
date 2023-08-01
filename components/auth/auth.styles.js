import { StyleSheet } from 'react-native';
import { COLORS, FONT, PADDING, SIZES } from '../../constants';

export const styles = StyleSheet.create({
  btnText: {
    color: COLORS.white,
    fontFamily: FONT.regular,
    letterSpacing: 0.5,
    textDecorationLine: 'underline',
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    padding: PADDING.large,
  },
  text: {
    fontFamily: FONT.regular,
    color: COLORS.white,
    textAlign: 'center',
    fontSize: SIZES.small,
  },
});
