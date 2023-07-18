import { View } from 'react-native';
import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { COLORS } from '../../constants';

export default function LoadingSpinner() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
      }}
    >
      <ActivityIndicator size={'large'} color={COLORS.secondary} />
    </View>
  );
}
