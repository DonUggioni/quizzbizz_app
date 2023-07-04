import { StyleSheet } from 'react-native';
import { COLORS, FONT, MARGIN, PADDING } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: PADDING.xLarge,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: MARGIN.large,
  },
  btn: {
    borderRadius: 10,
    borderColor: COLORS.orange,
    width: '45%',
  },
  btnText: {
    color: COLORS.white,
    fontFamily: FONT.regular,
    letterSpacing: 0.5,
  },
});
