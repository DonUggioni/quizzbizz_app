import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ActionButton from '../ActionButton';

describe('ActionButton', () => {
  it('renders correctly with text', () => {
    const onPressMock = jest.fn(); // Create a mock function for onPress

    const { getByText } = render(
      <ActionButton onPress={onPressMock} text='Submit' />
    );

    const buttonText = getByText('Submit');
    expect(buttonText).toBeTruthy(); // Assert that the button text is rendered

    fireEvent.press(buttonText);
    expect(onPressMock).toHaveBeenCalledTimes(1); // Assert that the onPress function is called
  });

  it('renders disabled button', () => {
    const onPressMock = jest.fn();

    const { getByText } = render(
      <ActionButton onPress={onPressMock} text='Submit' disabled={true} />
    );

    const buttonText = getByText('Submit');
    expect(buttonText).toBeTruthy();

    fireEvent.press(buttonText);
    expect(onPressMock).not.toHaveBeenCalled(); // Assert that the onPress function is not called
  });
});
