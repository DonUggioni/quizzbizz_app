import { render } from '@testing-library/react-native';
import QuestionBox from '../QuestionBox';

jest.mock('../../../context/context', () => ({
  useAppContext: () => ({
    state: {
      quizData: {
        results: [
          {
            question: 'Some question',
            // Other necessary properties for the test
          },
          // More result items if applicable
        ],
      },
      index: 0, // Set to the desired index
    },
  }),
}));

describe('QuestionBox', () => {
  describe('Question is received from state', () => {
    it('displays the question', () => {
      const { getByText } = render(<QuestionBox />);

      const question = getByText('Some question');
      expect(question).toBeTruthy();
    });
  });
});
