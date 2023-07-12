import { useState } from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import Input from '../textInput/TextInput';

import { styles } from './signIn.styles';
import SocialAuthButton from '../socialAuthButton/SocialAuthButton';
import Divider from '../divider/Divider';

import useAuth from '../../../hooks/useAuth';
import ActionButton from '../../actionButton/ActionButton';
import { useAppContext } from '../../../context/context';

export default function SignIn() {
  const { state } = useAppContext();
  const { promptAsync, signinUser } = useAuth();
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
            onPress={() => promptAsync()}
          />
          <SocialAuthButton logo={'facebook'} text={'Sign in with Facebook'} />
          <SocialAuthButton logo={'apple'} text={'Sign in with Apple'} />
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
