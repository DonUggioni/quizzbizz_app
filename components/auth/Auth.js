import { useState } from 'react';
import { View, Text } from 'react-native';

import SignIn from './signin/SignIn';
import SignUp from './signup/SignUp';
import { Button } from 'react-native-paper';

import { A } from '@expo/html-elements';

import { styles } from './auth.styles';

const privacyPolicyLink =
  'https://www.freeprivacypolicy.com/live/f2e06968-3c5f-447a-8d1b-bc2a52ac2352';
const termsAndConditionsLink =
  'https://www.privacypolicyonline.com/live.php?token=Wd5WGZeKwG8q5vqImaEWOcrS7dTzS8SM';

export default function Auth() {
  const [signin, setSignin] = useState(true);

  return (
    <View style={styles.container}>
      {signin ? <SignIn /> : <SignUp />}
      <Button
        labelStyle={styles.btnText}
        style={styles.btn}
        onPress={() => setSignin(!signin)}
      >
        {signin ? "Don't have an account yet?" : 'Already have an account?'}
      </Button>
      {!signin && (
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            By signing up you agree to the{' '}
            <A style={styles.linkBtnText} href={privacyPolicyLink}>
              Privacy Policy
            </A>{' '}
            and our{' '}
            <A style={styles.linkBtnText} href={termsAndConditionsLink}>
              Terms and Conditions
            </A>
            .
          </Text>
        </View>
      )}
    </View>
  );
}
