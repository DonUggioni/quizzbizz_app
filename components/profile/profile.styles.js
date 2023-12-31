import { StyleSheet } from 'react-native';
import { COLORS, FONT, MARGIN, PADDING, SIZES } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: PADDING.large,
    justifyContent: 'space-between',
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: SIZES.large,
    fontFamily: FONT.semiBold,
    letterSpacing: 0.5,
    color: COLORS.white,
    marginTop: MARGIN.medium,
    marginBottom: MARGIN.small,
  },
  text: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.white,
    marginVertical: MARGIN.small / 2,
    letterSpacing: 0.5,
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: MARGIN.small / 2,
  },
  signoutBtn: {
    backgroundColor: COLORS.orange,
    width: '80%',
    borderRadius: 10,
  },
  btnLabel: {
    fontSize: SIZES.medium,
    color: COLORS.white,
    fontFamily: FONT.semiBold,
    letterSpacing: 0.5,
  },
});
