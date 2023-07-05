import { useEffect, useMemo, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

import { useRouter } from 'expo-router';

import { ICONS } from '../../constants';
import { styles } from './subjectList.styles';
import SubjectCard from '../cards/subjectCard/SubjectCard';
import ActionButton from '../actionButton/ActionButton';

import { removeGeneralCategory } from '../../utils/functions';
import { getData } from '../../utils/functions';
import { useAppContext } from '../../context/context';
import LoadingScreen from '../loadingScreen/LoadingScreen';

import Animated, { FadeInDown } from 'react-native-reanimated';
import PointsDisplay from '../pointsDisplay/PointsDisplay';

export default function SubjectList() {
  const router = useRouter();
  const { dispatch, state } = useAppContext();
  const [activeSubject, setActiveSubject] = useState(null);

  async function fetchData(endpoint, params) {
    dispatch({ type: 'SHOW_LOADING_SCREEN' });
    try {
      const result = await getData(endpoint, params);
      dispatch({
        type: 'FETCH_DATA_SUCCESS',
        payload: result,
      });
      setTimeout(() => {
        dispatch({ type: 'HIDE_LOADING_SCREEN' });
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatch({ type: 'FETCH_DATA_ERROR' });
    }
  }

  useEffect(() => {
    fetchData('api_category.php');
  }, []);

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

    if (state.userPreferences?.difficulty !== null) {
      params.difficulty = state?.userPreferences.difficulty;
    }

    fetchData('api.php', params);

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

  if (state.error) {
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
      <PointsDisplay />
      <Text style={styles.heading}>Pick a subject</Text>
      <FlatList
        data={state.quizData.trivia_categories}
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
