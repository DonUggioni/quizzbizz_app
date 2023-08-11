// This component was created to solve a problem with the google oAuth redirect on Android not working properly. I would take me to an unmatched route and no other routes would work. So this component works as a loading screen for the google authentication, while the user is being autheticated and then redirected to the home page.

import { View, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS } from '../constants';

import { LoadingSpinner } from '../components';

import { Stack, useRouter } from 'expo-router';

export default function oauthredirect() {
  const router = useRouter();

  setTimeout(() => {
    router.back();
  }, 3500);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <LoadingSpinner />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
