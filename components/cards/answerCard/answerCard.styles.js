import { StyleSheet } from 'react-native';
import { COLORS, FONT, MARGIN, PADDING, SIZES } from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: COLORS.secondary,
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: PADDING.medium,
    marginBottom: MARGIN.medium,
  },
  subject: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: COLORS.white,
    letterSpacing: 0.5,
  },
});
