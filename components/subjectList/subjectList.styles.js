import { StyleSheet } from 'react-native';
import { COLORS, FONT, MARGIN, SIZES } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
  addContainer: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    marginTop: MARGIN.small,
  },
  heading: {
    fontSize: SIZES.xLarge,
    color: COLORS.white,
    fontFamily: FONT.regular,
    letterSpacing: 0.5,
    marginBottom: MARGIN.medium,
  },
  errorText: {
    color: COLORS.white,
    fontFamily: FONT.regular,
    letterSpacing: 0.5,
  },
});
