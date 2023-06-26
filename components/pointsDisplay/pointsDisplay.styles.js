import { StyleSheet } from 'react-native';
import { COLORS, SIZES, MARGIN, FONT } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 65,
    backgroundColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: MARGIN.xxLarge,
    marginBottom: MARGIN.xLarge,
    elevation: 2,
    shadowColor: '#000000',
  },
  heading: {
    color: COLORS.white,
    fontSize: SIZES.regular,
    fontFamily: FONT.regular,
    letterSpacing: 0.5,
  },
  points: {
    fontSize: SIZES.large,
    fontFamily: FONT.semiBold,
    color: COLORS.white,
  },
});
