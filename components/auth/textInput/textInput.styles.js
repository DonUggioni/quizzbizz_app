import { StyleSheet } from 'react-native';
import { COLORS, FONT, MARGIN, SIZES } from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    marginTop: MARGIN.large,
  },
  input: {
    height: 40,
    borderColor: COLORS.white,
    borderBottomWidth: 1,
    paddingLeft: 10,
    color: COLORS.white,
    fontFamily: FONT.regular,
    letterSpacing: 0.5,
    fontSize: SIZES.medium,
  },
  label: {
    fontFamily: FONT.regular,
    letterSpacing: 0.5,
  },
  imageContainer: {
    position: 'absolute',
    right: 12,
    bottom: 6,
  },
  img: {
    width: 30,
    height: 30,
  },
});
