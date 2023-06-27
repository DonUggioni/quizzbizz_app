import { StyleSheet } from 'react-native';
import { COLORS, FONT, MARGIN, PADDING, SIZES } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: MARGIN.xLarge,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: PADDING.small / 2,
  },
  text: {
    color: COLORS.white,
    fontFamily: FONT.regular,
    letterSpacing: 0.5,
    fontSize: SIZES.medium,
  },
  highlightText: {
    fontFamily: FONT.semiBold,
    letterSpacing: 0.5,
  },
});
