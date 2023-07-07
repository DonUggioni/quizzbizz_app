import { useState } from 'react';
import { View } from 'react-native';

import SignIn from './signin/SignIn';
import SignUp from './signup/SignUp';
import { Button } from 'react-native-paper';

import { styles } from './auth.styles';

export default function Auth() {
  const [signin, setSignin] = useState(true);
  return (
    <View>
      {signin ? <SignIn /> : <SignUp />}
      <Button
        labelStyle={styles.btnText}
        style={styles.btn}
        onPress={() => setSignin(!signin)}
      >
        {signin ? "Don't have an account yet?" : 'Already have an account?'}
      </Button>
    </View>
  );
}
