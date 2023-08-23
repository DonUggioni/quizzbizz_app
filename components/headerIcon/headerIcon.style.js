import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  btnContainer: {
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnImage: (width, height) => ({
    width: width,
    height: height,
    borderRadius: 50,
  }),
});
