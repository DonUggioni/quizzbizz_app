import { render, fireEvent } from '@testing-library/react-native';
import FinishCard from '../FinishCard';
import * as contextModule from '../../../context/context';
import * as ExpoRouter from 'expo-router';
import useSound from '../../../hooks/useSound';
import { SOUNDS } from '../../../constants';

jest.mock('../../../context/context', () => ({
  useAppContext: jest.fn(),
}));

jest.mock('../../../hooks/useSound', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('expo-router');

describe('FinishCard', () => {
  it('renders the finish card', () => {
    const dispatchMock = jest.fn();
    contextModule.useAppContext.mockReturnValue({
      state: {
        quizData: {
          results: [1, 2], // Mocking results array
        },
        correctAnswers: 2, // Mocking correctAnswers value
        points: 123, // Mocking points value
      },
      dispatch: dispatchMock,
    });

    const playSoundEffectMock = jest.fn();
    useSound.mockReturnValue({
      playSoundEffect: playSoundEffectMock,
    });

    const { getByText, getByTestId } = render(<FinishCard />);

    // Assert that the expected text is rendered
    expect(getByText('Score: 123pts')).toBeTruthy();
    expect(getByText('You got 100% right out of 2 questions.')).toBeTruthy();
    expect(getByText('Great job!')).toBeTruthy();
    expect(playSoundEffectMock).toHaveBeenCalledWith(SOUNDS.greatScore);
    expect(getByTestId('LottieAnimation')).toBeTruthy();
  });

  it('restarts the quizz', () => {
    const dispatchMock = jest.fn();
    contextModule.useAppContext.mockReturnValue({
      state: {
        quizData: {
          results: [1, 2], // Mocking results array
        },
        correctAnswers: 2, // Mocking correctAnswers value
        points: 123, // Mocking points value
      },
      dispatch: dispatchMock,
    });

    // Mock the replace function from expo-router
    ExpoRouter.useRouter.mockReturnValue({
      replace: jest.fn(),
    });

    const { getByText } = render(<FinishCard />);
    // Get the button and press it
    const restartButton = getByText('Quizz Me Again');
    fireEvent.press(restartButton);

    // Assert that the expected actions were called
    expect(dispatchMock).toHaveBeenCalledWith({ type: 'RESTART' });
    expect(ExpoRouter.useRouter().replace).toHaveBeenCalledWith('/home');
  });
});
