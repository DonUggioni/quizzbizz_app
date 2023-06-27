import { View } from 'react-native';

import QuestionCard from '../cards/questionCard/QuestionCard';
import ActionButton from '../actionButton/ActionButton';

import { styles } from './questionList.styles';
import { useRouter } from 'expo-router';

const question = [
  { question: 'Lorem ipsum dolor sit amet.', id: 1 },
  { question: 'Lorem ipsum dolor sit amet.', id: 2 },
  { question: 'Lorem ipsum dolor sit amet.', id: 3 },
  { question: 'Lorem ipsum dolor sit amet.', id: 4 },
];

export default function QuestionList() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {question.map((item) => {
        return <QuestionCard question={item.question} key={item.id} />;
      })}
      <ActionButton
        text={'Submit'}
        onPress={() => router.push('/finishStats/')}
      />
    </View>
  );
}
