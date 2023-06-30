import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

import { useRouter } from 'expo-router';

import { COLORS, ICONS, MARGIN } from '../../constants';
import { styles } from './subjectList.styles';
import SubjectCard from '../cards/subjectCard/SubjectCard';
import ActionButton from '../actionButton/ActionButton';

import { removeGeneralCategory } from '../../utils/functions';
import { getData } from '../../utils/functions';
import { useAppContext } from '../../context/context';
import LoadingScreen from '../loadingScreen/LoadingScreen';

export default function SubjectList() {
  const router = useRouter();
  const { dispatch, state } = useAppContext();
  const [activeSubject, setActiveSubject] = useState(null);

  const fetchData = async (endpoint) => {
    dispatch({ type: 'FETCH_DATA_REQUEST' });
    try {
      const result = await getData(endpoint);
      dispatch({
        type: 'FETCH_DATA_SUCCESS',
        payload: result,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'FETCH_DATA_ERROR' });
    }
  };

  useEffect(() => {
    fetchData('api_category.php');
  }, []);

  function handleCardPress(subject) {
    setActiveSubject(subject);
    dispatch({ type: 'CURRENT_SUBJECT', payload: subject });
  }

  function submitHandler() {
    fetchData(`api.php?amount=2&category=${activeSubject.id}`);
    dispatch({ type: 'SHOW_LOADING_SCREEN' });

    setTimeout(() => {
      router.replace(`/questions/${activeSubject.id}`);
    }, 1000);

    setTimeout(() => {
      dispatch({ type: 'HIDE_LOADING_SCREEN' });
    }, 2000);
  }

  if (state.isLoading) {
    return (
      <View
        style={[
          styles.container,
          { alignItems: 'center', justifyContent: 'center' },
        ]}
      >
        <ActivityIndicator size={'large'} color={COLORS.secondary} />
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

  if (state.loadingScreen) {
    return (
      <View
        style={[
          styles.container,
          { alignItems: 'center', justifyContent: 'center' },
        ]}
      >
        <LoadingScreen />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pick a subject</Text>
      {state.quizData.trivia_categories && (
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
          contentContainerStyle={{
            rowGap: MARGIN.medium,
          }}
        />
      )}
      <ActionButton onPress={() => submitHandler()} text={'Quiz Me'} />
    </View>
  );
}
