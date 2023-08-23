import { useEffect, useMemo } from 'react';
import { View, Text, FlatList } from 'react-native';

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
import useAd from '../../hooks/useAd';
import { trackEvent } from '@aptabase/react-native';

import { HOME_BANNER_UNIT_ID } from '../../utils/defaults';

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.GAM_BANNER : HOME_BANNER_UNIT_ID;

export default function SubjectList() {
  const { fetchQuestions } = useFetch();
  const { playAd } = useAd();
  const { dispatch, state } = useAppContext();

  function handleCardPress(item) {
    dispatch({ type: 'SET_CURRENT_SUBJECT', payload: item });
  }

  const loadingAnimation = useMemo(() => {
    return <LoadingScreen />;
  }, [state.isLoading]);

  useEffect(() => {
    if (!state.adIsLoaded) return;

    setTimeout(() => {
      playAd();
    }, 1800);
  }, [state.adIsLoaded]);

  function submitHandler() {
    trackEvent('clicked', { button: 'start_game' });
    trackEvent('category_played', { category: state.currentSubject.name });

    const params = {
      amount: state.userPreferences.numOfQuestions,
      category: state.currentSubject.id,
    };

    if (state.userPreferences?.difficulty !== 'any') {
      params.difficulty = state?.userPreferences.difficulty;
    }

    // It's listening to the insterstitial, when the add is closed by the user, it will trigger fetchQuestions
    fetchQuestions('api.php', params);
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
      <View style={styles.addContainer}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
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
            isActive={state.currentSubject?.name === item.name}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      {state.currentSubject !== null && (
        <Animated.View entering={FadeInDown.duration(400)}>
          <ActionButton
            disabled={state.currentSubject === null ? true : false}
            onPress={() => submitHandler()}
            text={'Quizz Me'}
          />
        </Animated.View>
      )}
    </View>
  );
}
