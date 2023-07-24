import { StyleSheet } from 'react-native';
import { COLORS, FONT, MARGIN, PADDING, SIZES } from '../../../constants';

export const styles = StyleSheet.create({
  containerStyle: {
    width: '90%',
    backgroundColor: COLORS.blue500,
    padding: PADDING.large,
    alignSelf: 'center',
    borderRadius: 10,
  },
  title: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.large,
    color: COLORS.white,
    letterSpacing: 0.5,
    textAlign: 'center',
    marginBottom: MARGIN.medium,
  },
  text: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.white,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: MARGIN.large,
    marginTop: MARGIN.xLarge,
  },
  btnStay: {
    backgroundColor: COLORS.orange,
    width: '40%',
    borderRadius: 10,
  },
  btnText: {
    letterSpacing: 0.5,
    color: COLORS.white,
    fontFamily: FONT.regular,
  },
});
