import { StyleSheet } from 'react-native';
import { COLORS, FONT, MARGIN, PADDING, SIZES } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: MARGIN.xLarge * 2,
    padding: PADDING.large,
  },
  avatarContainer: {
    alignItems: 'center',
    gap: MARGIN.medium,
    width: '100%',
  },
  avatar: {
    width: 102,
    height: 102,
    borderRadius: 100,
  },
  button: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    letterSpacing: 0.5,
  },
  usernameContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: COLORS.secondary,
  },
  input: {
    height: 46,
    width: '100%',
    paddingHorizontal: PADDING.medium,
    paddingVertical: PADDING.small,
    color: COLORS.white,
    fontFamily: FONT.regular,
    letterSpacing: 0.5,
    fontSize: SIZES.medium,
    flexBasis: '80%',
  },
  doneButton: {
    backgroundColor: COLORS.orange,
    width: '100%',
    borderRadius: 10,
  },
  semiBold: {
    fontFamily: FONT.semiBold,
  },
});