import { View } from 'react-native';
import { Stack } from 'expo-router';
import { COLORS, PADDING } from '../../constants';
import GeneralHeader from '../../components/customHeaders/generalHeader/GeneralHeader';
import { QuestionBox, QuestionList, QuestionsInfoBar } from '../../components';

export default function Questions() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
        paddingHorizontal: PADDING.large,
      }}
    >
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

      <QuestionsInfoBar width={100} />
      <QuestionBox />
      <QuestionList />
    </View>
  );
}
