import { StyleSheet } from 'react-native';
import { COLORS, MARGIN } from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 3,
    paddingHorizontal: 4,
    width: '100%',
    backgroundColor: COLORS.secondary,
    marginTop: MARGIN.small,
    justifyContent: 'center',
    borderRadius: 10,
  },
  bar: (width) => ({
    width: width,
    height: 4,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  }),
});
