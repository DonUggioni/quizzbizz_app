import { useEffect } from 'react';
import { useAppContext } from '../context/context';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

import { HOME_INTERSTITIAL_UNIT_ID } from '../utils/defaults';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : HOME_INTERSTITIAL_UNIT_ID;

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

function useAd() {
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    // Start loading the interstitial straight away
    interstitial.load();
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        dispatch({ type: 'SET_AD_IS_LOADED', payload: true });
      }
    );

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, [state.addIsLoaded]);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        dispatch({ type: 'SET_AD_IS_LOADED', payload: false });
      }
    );

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, [state.adIsLoaded]);

  function playAd() {
    interstitial.show();
  }

  return { playAd, interstitial };
}

export default useAd;
