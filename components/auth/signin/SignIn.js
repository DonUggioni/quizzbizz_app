import { useState } from 'react';
import { View, Text } from 'react-native';

import Input from '../textInput/TextInput';

import { styles } from './signIn.styles';
import SocialAuthButton from '../socialAuthButton/SocialAuthButton';
import Divider from '../divider/Divider';

export default function SignIn() {
  const [inputValue, setInputValue] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
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
      </View>
      <Divider />
      <View style={styles.btnContainer}>
        <SocialAuthButton logo={'google'} text={'Sign in with Google'} />
        <SocialAuthButton logo={'facebook'} text={'Sign in with Facebook'} />
        <SocialAuthButton logo={'apple'} text={'Sign in with Apple'} />
      </View>
    </View>
  );
}
