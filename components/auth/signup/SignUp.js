import { useState } from 'react';
import { View, Text } from 'react-native';

import Animated, { FadeInDown } from 'react-native-reanimated';

import { styles } from './signUp.styles';

import Input from '../textInput/TextInput';
import SocialAuthButton from '../socialAuthButton/SocialAuthButton';
import Divider from '../divider/Divider';
import ActionButton from '../../actionButton/ActionButton';

import * as WebBrowser from 'expo-web-browser';

import useAuth from '../../../hooks/useAuth';

WebBrowser.maybeCompleteAuthSession();

export default function SignUp() {
  const { promptAsync, createUser } = useAuth();

  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  function displayButtons() {
    if (inputValues.email) {
      return (
        <Animated.View entering={FadeInDown} style={styles.signBtnContainer}>
          <ActionButton
            text='Submit'
            onPress={() => createUser(inputValues.email, inputValues.password)}
          />
        </Animated.View>
      );
    } else {
      return (
        <>
          <SocialAuthButton
            logo={'google'}
            text={'Sign up with Google'}
            onPress={() => promptAsync()}
          />
          <SocialAuthButton logo={'facebook'} text={'Sign up with Facebook'} />
          <SocialAuthButton logo={'apple'} text={'Sign up with Apple'} />
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
