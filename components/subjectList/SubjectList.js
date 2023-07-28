import { useMemo, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

import { useRouter } from 'expo-router';

import { ICONS, MARGIN } from '../../constants';
import { styles } from './subjectList.styles';
import SubjectCard from '../cards/subjectCard/SubjectCard';
import ActionButton from '../actionButton/ActionButton';

import { removeGeneralCategory } from '../../utils/functions';
import { useAppContext } from '../../context/context';
import LoadingScreen from '../loadingScreen/LoadingScreen';

import Animated, { FadeInDown } from 'react-native-reanimated';
import PointsDisplay from '../pointsDisplay/PointsDisplay';

import useFetch from '../../hooks/useFetch';

export default function SubjectList() {
  const router = useRouter();
  const { fetchQuestions } = useFetch();
  const { dispatch, state } = useAppContext();
  const [activeSubject, setActiveSubject] = useState(null);

  function handleCardPress(item) {
    setActiveSubject(item);
    dispatch({ type: 'SET_CURRENT_SUBJECT', payload: item });
  }

  const loadingAnimation = useMemo(() => {
    return <LoadingScreen />;
  }, [state.isLoading]);

  function submitHandler() {
    dispatch({ type: 'SHOW_LOADING_SCREEN' });

    const params = {
      amount: state?.userPreferences.numOfQuestions,
      category: activeSubject?.id,
    };

    if (state.userPreferences?.difficulty !== 'any') {
      params.difficulty = state?.userPreferences.difficulty;
    }

    fetchQuestions('api.php', params);

    setTimeout(() => {
      router.replace(`/questions/${activeSubject.id}`);
      dispatch({ type: 'HIDE_LOADING_SCREEN' });
    }, 2500);
  }

  if (state.isLoading) {
    return (
      <View
        style={[
          styles.container,
          { alignItems: 'center', justifyContent: 'center' },
        ]}
      >
        {loadingAnimation}
      </View>
    );
  }

  if (state.error.error) {
    return (
      <View
        style={[
          styles.container,
          { alignItems: 'center', justifyContent: 'center' },
        ]}
      >
        <Text style={styles.errorText}>Something went wrong.</Text>
        <Text style={styles.errorText}>Please try again.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {state.user !== null && <PointsDisplay />}
      <Text
        style={[
          styles.heading,
          { marginTop: state.user === null ? MARGIN.xLarge : null },
        ]}
      >
        Pick a subject
      </Text>
      <FlatList
        data={state.subjectList.trivia_categories}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <SubjectCard
            source={ICONS[`icon-${item.id}`]}
            subject={removeGeneralCategory(item.name)}
            onPress={() => handleCardPress(item)}
            isActive={activeSubject?.name === item.name}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      {activeSubject !== null && (
        <Animated.View entering={FadeInDown.duration(400)}>
          <ActionButton
            disabled={activeSubject === null ? true : false}
            onPress={() => submitHandler()}
            text={'Quiz Me'}
          />
        </Animated.View>
      )}
    </View>
  );
}
