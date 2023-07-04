import { StyleSheet } from 'react-native';
import { COLORS, FONT, MARGIN, SIZES } from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    marginBottom: MARGIN.xLarge,
  },
  textBox: {
    marginBottom: MARGIN.medium,
  },
  text: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    letterSpacing: 0.5,
    color: COLORS.white,
  },
  subTitle: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    letterSpacing: 0.5,
    color: COLORS.white,
  },
  btnContainer: {
    flexDirection: 'row',
    gap: MARGIN.medium,
  },
  btn: {
    borderColor: COLORS.white,
    borderRadius: 10,
    marginRight: MARGIN.medium,
  },
  btnText: {
    fontFamily: FONT.regular,
    letterSpacing: 0.5,
  },
  highLight: {
    fontFamily: FONT.semiBold,
    letterSpacing: 0.5,
    color: COLORS.orange,
  },
});
