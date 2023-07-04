import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
  },
  isCorrect: {
    backgroundColor: COLORS.green,
    borderColor: COLORS.green,
  },
  isIncorrect: {
    backgroundColor: COLORS.red,
    borderColor: COLORS.red,
  },
});
