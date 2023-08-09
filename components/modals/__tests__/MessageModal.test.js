import { render, fireEvent } from '@testing-library/react-native';
import { useAppContext } from '../../../context/context';
import { Provider } from 'react-native-paper';
import MessageModal from '../messageModal/MessageModal';

jest.mock('../../../context/context', () => ({
  useAppContext: jest.fn(),
}));

describe('Message Modal', () => {
  it('renders the modal with the message', () => {
    const dispatchMock = jest.fn();
    useAppContext.mockReturnValue({
      state: {
        error: {
          message: 'Mock error message',
        },
      },
      dispatch: dispatchMock,
    });

    const { getByText } = render(
      <Provider>
        <MessageModal visible={true} onDismiss={() => {}} />
      </Provider>
    );

    expect(getByText('Oops!')).toBeTruthy();
    expect(getByText('Mock error message')).toBeTruthy();
  });

  it('hides the message modal', () => {
    const dispatchMock = jest.fn();
    useAppContext.mockReturnValue({
      state: {
        error: {
          message: 'Mock error message',
        },
      },
      dispatch: dispatchMock,
    });

    const { getByText } = render(
      <Provider>
        <MessageModal visible={true} onDismiss={() => {}} />
      </Provider>
    );

    //   Press the Okay button to close modal
    fireEvent.press(getByText('Okay!'));

    expect(dispatchMock).toHaveBeenCalledWith({ type: 'HIDE_MESSAGE' });
  });
});
