import { View } from 'react-native';
import { Stack } from 'expo-router';
import { COLORS, PADDING } from '../../constants';
import GeneralHeader from '../../components/customHeaders/generalHeader/GeneralHeader';
import {
  ModalWindow,
  QuestionBox,
  AnswerList,
  QuestionsInfoBar,
} from '../../components';

import { useAppContext } from '../../context/context';
import { PaperProvider } from 'react-native-paper';

export default function Questions() {
  const { state, dispatch } = useAppContext();

  return (
    <PaperProvider>
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
        <ModalWindow
          visible={state?.modalVisible}
          onDismiss={() => dispatch({ type: 'HIDE_MODAL' })}
        />
        <QuestionsInfoBar width={100} />
        <QuestionBox />
        <AnswerList />
      </View>
    </PaperProvider>
  );
}
