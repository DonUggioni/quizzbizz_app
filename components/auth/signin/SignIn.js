import { useState } from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import Input from '../textInput/TextInput';

import { styles } from './signIn.styles';
import SocialAuthButton from '../socialAuthButton/SocialAuthButton';
import Divider from '../divider/Divider';

import useAuth from '../../../hooks/useAuth';
import ActionButton from '../../actionButton/ActionButton';

import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const { googlePromptAsync, signinUser } = useAuth();
  const [hidePassword, setHidePassword] = useState(true);
  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
  });

  function displayButtons() {
    if (inputValues.email) {
      return (
        <Animated.View entering={FadeInDown} style={styles.signBtnContainer}>
          <ActionButton
            text='Submit'
            onPress={() => signinUser(inputValues.email, inputValues.password)}
          />
        </Animated.View>
      );
    } else {
      return (
        <>
          <SocialAuthButton
            logo={'google'}
            text={'Sign in with Google'}
            onPress={() => googlePromptAsync()}
          />
          {/* <SocialAuthButton
            logo={'facebook'}
            text={'Sign in with Facebook'}
            onPress={() => facebookPromptAsync()}
          />
          <SocialAuthButton logo={'apple'} text={'Sign in with Apple'} /> */}
        </>
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
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
      </View>
      <Divider />
      <View style={styles.btnContainer}>{displayButtons()}</View>
    </View>
  );
}
