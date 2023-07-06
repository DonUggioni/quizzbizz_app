import { useState } from 'react';
import { View } from 'react-native';

import Input from '../textInput/TextInput';

import { styles } from './signUp.styles';

export default function SignUp() {
  const [inputValue, setInputValue] = useState('');

  return (
    <View style={styles.container}>
      <Input
        label={'Email'}
        onChangeText={(text) => setInputValue(text)}
        inputValue={inputValue}
        secureTextEntry={false}
      />
    </View>
  );
}
