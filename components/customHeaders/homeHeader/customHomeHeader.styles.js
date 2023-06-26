import { StyleSheet } from 'react-native';
import { COLORS, FONT, PADDING, SIZES } from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 130,
    backgroundColor: COLORS.secondary,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: PADDING.large,
    elevation: 10,
    shadowColor: '#000000',
  },
  headerBackground: {
    backgroundColor: COLORS.primary,
  },
  heading: {
    fontSize: SIZES.xxLarge,
    fontFamily: FONT.regular,
    color: COLORS.white,
  },
});
