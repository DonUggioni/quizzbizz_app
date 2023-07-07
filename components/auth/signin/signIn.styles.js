import { StyleSheet } from 'react-native';
import { COLORS, FONT, MARGIN, PADDING, SIZES } from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    padding: PADDING.large,
  },
  inputsContainer: {
    gap: MARGIN.medium,
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: FONT.semiBold,
    letterSpacing: 0.5,
    color: COLORS.white,
    textAlign: 'center',
  },
  btnContainer: {
    gap: MARGIN.medium,
  },
});
