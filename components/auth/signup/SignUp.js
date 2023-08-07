import { useState } from 'react';
import { View, Text } from 'react-native';

import Animated, { FadeInDown } from 'react-native-reanimated';

import { styles } from './signUp.styles';

import Input from '../textInput/TextInput';
import SocialAuthButton from '../socialAuthButton/SocialAuthButton';
import Divider from '../divider/Divider';
import ActionButton from '../../actionButton/ActionButton';

import { useAppContext } from '../../../context/context';

import useAuth from '../../../hooks/useAuth';

import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

function isValidEmail(email) {
  // Regular expression to validate email addresses
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Test the email against the regex pattern
  return emailRegex.test(email);
}

export default function SignUp() {
  const { dispatch } = useAppContext();
  const { googlePromptAsync, createUser } = useAuth();
  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  function createUserHandler() {
    const isValid = isValidEmail(inputValues.email);

    if (!isValid) {
      dispatch({
        type: 'SHOW_MESSAGE',
        payload: 'Please enter a valid email address.',
      });
    } else if (inputValues.password.length < 8) {
      dispatch({
        type: 'SHOW_MESSAGE',
        payload: 'Password must contain at least 8 characters.',
      });
    } else if (inputValues.password !== inputValues.confirmPassword) {
      dispatch({
        type: 'SHOW_MESSAGE',
        payload: "Passwords don't match.",
      });
    } else {
      createUser(inputValues.email, inputValues.password);
    }
  }

  function displayButtons() {
    if (inputValues.email) {
      return (
        <Animated.View entering={FadeInDown} style={styles.signBtnContainer}>
          <ActionButton text='Submit' onPress={() => createUserHandler()} />
        </Animated.View>
      );
    } else {
      return (
        <>
          <SocialAuthButton
            logo={'google'}
            text={'Sign up with Google'}
            onPress={() => googlePromptAsync()}
          />
          {/* <SocialAuthButton
            logo={'facebook'}
            text={'Sign up with Facebook'}
            onPress={() => facebookPromptAsync()}
          />
          <SocialAuthButton logo={'apple'} text={'Sign up with Apple'} /> */}
        </>
      );
    }
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Sign up</Text>
        <View style={styles.inputsContainer}>
          <Input
            label={'Email'}
            onChangeText={(text) =>
              setInputValues({ ...inputValues, email: text })
            }
            inputValue={inputValues.email}
            secureTextEntry={false}
          />
          <Input
            label={'Password'}
            onChangeText={(text) =>
              setInputValues({ ...inputValues, password: text })
            }
            inputValue={inputValues.password}
            secureTextEntry={hidePassword}
            icon={true}
            view={hidePassword}
            onPress={() => setHidePassword(!hidePassword)}
          />
          <Input
            label={'Confirm Password'}
            onChangeText={(text) =>
              setInputValues({ ...inputValues, confirmPassword: text })
            }
            inputValue={inputValues.confirmPassword}
            secureTextEntry={hideConfirmPassword}
            icon={true}
            view={hideConfirmPassword}
            onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
          />
        </View>
        <Divider />
        <View style={styles.btnContainer}>{displayButtons()}</View>
      </View>
    </>
  );
}
