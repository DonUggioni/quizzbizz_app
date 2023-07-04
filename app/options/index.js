import { View } from 'react-native';
import React from 'react';
import GeneralHeader from '../../components/customHeaders/generalHeader/GeneralHeader';
import { COLORS, ICONS } from '../../constants';
import { Stack } from 'expo-router';
import { Options, SettingsHeader } from '../../components';

export default function index() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
        paddingHorizontal: 24,
      }}
    >
      <Stack.Screen
        options={{
          header: () => {
            return (
              <SettingsHeader icon={ICONS.settingsIcon} title={'Settings'} />
            );
          },
        }}
      />
      <Options />
    </View>
  );
}
