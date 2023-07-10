import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import { styles } from './signUp.styles';
import Input from '../textInput/TextInput';
import SocialAuthButton from '../socialAuthButton/SocialAuthButton';
import Divider from '../divider/Divider';

import { useRouter } from 'expo-router';
import { useAppContext } from '../../../context/context';

import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from 'firebase/auth';
import { auth } from '../../../firebase/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IOS_CLIENT_ID, ANDROID_CLIENT_ID } from '@env';

import { makeRedirectUri } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export default function SignUp() {
  const router = useRouter();
  const { dispatch } = useAppContext();
  const [inputValue, setInputValue] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    redirectUri: makeRedirectUri({ scheme: 'com.quizapp' }),
  });

  useEffect(() => {
    if (response?.type === 'success') {
      // router.replace('/home');
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('user created');
        dispatch({ type: 'SET_USER', payload: user });
      } else {
        console.log('else');
      }
    });

    return () => {
      unsub();
    };
  }, []);

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
        <SocialAuthButton
          logo={'google'}
          text={'Sign up with Google'}
          onPress={() => promptAsync()}
        />
        <SocialAuthButton logo={'facebook'} text={'Sign up with Facebook'} />
        <SocialAuthButton logo={'apple'} text={'Sign up with Apple'} />
      </View>
    </View>
  );
}
