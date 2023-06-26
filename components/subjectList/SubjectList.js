import { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import SubjectCard from '../cards/subjectCard/SubjectCard';

import { ICONS, MARGIN } from '../../constants';
import { styles } from './subjectList.styles';
import ActionButton from '../actionButton/ActionButton';

import { useRouter } from 'expo-router';

const trivia_categories = [
  {
    id: 9,
    name: 'General Knowledge',
  },
  {
    id: 10,
    name: 'Entertainment: Books',
  },
  {
    id: 11,
    name: 'Entertainment: Film',
  },
  {
    id: 12,
    name: 'Entertainment: Music',
  },
  {
    id: 90,
    name: 'General Knowledge1',
  },
  {
    id: 100,
    name: 'Entertainment: Books1',
  },
  {
    id: 110,
    name: 'Entertainment: Film1',
  },
  {
    id: 120,
    name: 'Entertainment: Music1',
  },
];

export default function SubjectList() {
  const router = useRouter();
  const [activeSubject, setActiveSubject] = useState(null);

  function handleCardPress(subject) {
    setActiveSubject(subject);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pick a subject</Text>
      <FlatList
        data={trivia_categories}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <SubjectCard
            source={ICONS[`icon-${item.id}`]}
            subject={item.name}
            onPress={() => handleCardPress(item.name)}
            isActive={activeSubject === item.name}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          rowGap: MARGIN.medium,
        }}
      />
      <ActionButton
        onPress={() => router.push(`/questions/${activeSubject}`)}
      />
    </View>
  );
}
