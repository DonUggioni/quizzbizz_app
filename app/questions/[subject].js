import { View } from 'react-native';
import { Stack } from 'expo-router';
import { COLORS } from '../../constants';
import GeneralHeader from '../../components/customHeaders/generalHeader/GeneralHeader';
import QuestionsInfoBar from '../../components/questionsInfoBar/QuestionsInfoBar';

export default function Questions() {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.secondary,
          },
          headerTitleStyle: { color: COLORS.white },
          headerBackVisible: false,
          header: () => <GeneralHeader />,
        }}
      />

      <QuestionsInfoBar />
    </View>
  );
}
