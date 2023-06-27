import { View } from 'react-native';
import React from 'react';
import { FinishCard } from '../../components';

import { styles } from './finishStats.styles';
import { Stack } from 'expo-router';

export default function FinishStats() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerBackVisible: false,
          headerShown: false,
        }}
      />
      <FinishCard />
    </View>
  );
}
