import { StyleSheet } from 'react-native';
import { COLORS, FONT, MARGIN, PADDING, SIZES } from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 110,
    backgroundColor: COLORS.secondary,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: PADDING.large,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgContainer: {
    width: 36,
    height: 36,
    marginRight: MARGIN.large,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: COLORS.white,
    fontFamily: FONT.regular,
    fontSize: SIZES.xLarge,
    letterSpacing: 0.5,
  },
});
