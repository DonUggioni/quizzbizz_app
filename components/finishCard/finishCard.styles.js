import { StyleSheet } from 'react-native';
import { COLORS, FONT, MARGIN, PADDING, SIZES } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    padding: PADDING.large,
  },
  animationSize: {
    width: 270,
  },
  statsContainer: {
    width: '100%',
    backgroundColor: COLORS.blue500,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  pointsContainer: {
    marginBottom: MARGIN.large,
  },
  heading: {
    fontSize: SIZES.xxLarge,
    color: COLORS.blue400,
    fontFamily: FONT.semiBold,
  },
  text: {
    fontFamily: FONT.regular,
    color: COLORS.white,
    fontSize: SIZES.xLarge,
    textAlign: 'center',
  },
  highlightOrange: {
    color: COLORS.orange,
  },
  highlightBlue: {
    color: COLORS.blue400,
  },
  paddingBottom: {
    paddingBottom: PADDING.xLarge,
  },
});
