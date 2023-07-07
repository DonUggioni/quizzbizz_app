import { StyleSheet } from 'react-native';
import { COLORS, FONT } from '../../constants';

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
});
