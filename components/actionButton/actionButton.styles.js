import { StyleSheet } from 'react-native';
import { COLORS, FONT, MARGIN, SIZES } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 65,
    backgroundColor: COLORS.orange,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginVertical: MARGIN.medium,
  },
  text: {
    fontSize: SIZES.xLarge,
    fontFamily: FONT.regular,
    color: COLORS.white,
    letterSpacing: 0.5,
  },
});
