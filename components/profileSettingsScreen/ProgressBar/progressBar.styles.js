import { StyleSheet } from 'react-native';
import { COLORS, FONT, MARGIN, PADDING } from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: PADDING.large,
    elevation: 2,
  },
  modal: {
    backgroundColor: COLORS.secondary,
    height: 140,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: PADDING.large,
    gap: MARGIN.small,
  },
  progressBar: {
    width: 300,
    height: 6,
    borderRadius: 10,
  },
  text: {
    fontFamily: FONT.regular,
    color: COLORS.white,
    letterSpacing: 0.5,
  },
});
