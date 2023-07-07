import { StyleSheet } from 'react-native';
import { COLORS, FONT, MARGIN, SIZES } from '../../../constants';

export const styles = StyleSheet.create({
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: MARGIN.xxLarge,
    gap: MARGIN.small,
  },
  dividerLine: {
    width: '35%',
    height: 1,
    backgroundColor: COLORS.white,
  },
  dividerText: {
    color: COLORS.white,
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
  },
});
