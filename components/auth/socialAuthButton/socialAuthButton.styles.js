import { StyleSheet } from 'react-native';
import { COLORS, FONT, MARGIN, SIZES } from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '95%',
    backgroundColor: COLORS.grey400,
    borderRadius: 10,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    gap: MARGIN.large,
  },
  img: {
    width: 40,
    height: 40,
  },
  text: {
    fontSize: SIZES.large,
    fontFamily: FONT.regular,
  },
});
