import { render, fireEvent } from '@testing-library/react-native';
import * as contextModule from '../../../context/context';
import * as ExpoRouter from 'expo-router';
import ModalWindow from '../Modal';
import { Provider } from 'react-native-paper';

jest.mock('../../../context/context', () => ({
  useAppContext: jest.fn(),
}));

jest.mock('expo-router');

describe('Modal', () => {
  it('renders the modal', () => {
    // Mock context dispatch
    const dispatchMock = jest.fn();
    contextModule.useAppContext.mockReturnValue({
      dispatch: dispatchMock,
    });

    const { getByText } = render(
      <Provider>
        <ModalWindow visible={true} onDismiss={() => {}} />
      </Provider>
    );

    // Assert the modal content
    expect(getByText('Are you sure you want to leave?')).toBeTruthy();
  });

  it('calls dispatch and router replace on Leave button press', () => {
    // Mock context dispatch
    const dispatchMock = jest.fn();
    contextModule.useAppContext.mockReturnValue({
      dispatch: dispatchMock,
    });

    // Mock router replace
    ExpoRouter.useRouter.mockReturnValue({
      replace: jest.fn(),
    });

    // Render the component
    const { getByText } = render(
      <Provider>
        <ModalWindow visible={true} onDismiss={() => {}} />
      </Provider>
    );

    // Find and press the Leave button
    fireEvent.press(getByText('Leave'));

    // Assert dispatch was called with the correct action
    expect(dispatchMock).toHaveBeenCalledWith({ type: 'CANCEL_QUIZ' });

    // Assert replace was called with the correct route
    expect(ExpoRouter.useRouter().replace).toHaveBeenCalledWith('/home');
  });

  it('closes the modal and stays in the same page', () => {
    // Mock context dispatch
    const dispatchMock = jest.fn();
    contextModule.useAppContext.mockReturnValue({
      dispatch: dispatchMock,
    });

    // Render the component
    const { getByText } = render(
      <Provider>
        <ModalWindow visible={true} onDismiss={() => {}} />
      </Provider>
    );

    // Find and press the stay button
    fireEvent.press(getByText('Stay'));

    expect(dispatchMock).toHaveBeenCalledWith({ type: 'HIDE_MODAL' });
  });
});
