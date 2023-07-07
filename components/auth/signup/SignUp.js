import { useState } from 'react';
import { View, Text } from 'react-native';

import Input from '../textInput/TextInput';

import { styles } from './signUp.styles';
import SocialAuthButton from '../socialAuthButton/SocialAuthButton';
import Divider from '../divider/Divider';

export default function SignUp() {
  const [inputValue, setInputValue] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <View style={styles.inputsContainer}>
        <Input
          label={'Email'}
          onChangeText={(text) => setInputValue(text)}
          inputValue={inputValue}
          secureTextEntry={false}
        />
        <Input
          label={'Password'}
          onChangeText={(text) => setInputValue(text)}
          inputValue={inputValue}
          secureTextEntry={hidePassword}
          icon={true}
          view={hidePassword}
          onPress={() => setHidePassword(!hidePassword)}
        />
        <Input
          label={'Confirm Password'}
          onChangeText={(text) => setInputValue(text)}
          inputValue={inputValue}
          secureTextEntry={hideConfirmPassword}
          icon={true}
          view={hideConfirmPassword}
          onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
        />
      </View>
      <Divider />
      <View style={styles.btnContainer}>
        <SocialAuthButton logo={'google'} text={'Sign up with Google'} />
        <SocialAuthButton logo={'facebook'} text={'Sign up with Facebook'} />
        <SocialAuthButton logo={'apple'} text={'Sign up with Apple'} />
      </View>
    </View>
  );
}
