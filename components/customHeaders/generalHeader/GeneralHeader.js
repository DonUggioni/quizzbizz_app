import { useState } from 'react';
import { View, Text, Image } from 'react-native';
import HeaderIcon from '../../headerIcon/HeaderIcon';

import { styles } from './generalHeader.styles';
import { ICONS } from '../../../constants';

import { useRouter } from 'expo-router';
import { useAppContext } from '../../../context/context';

import { removeGeneralCategory } from '../../../utils/functions';
import ModalWindow from '../../modal/Modal';

export default function GeneralHeader({ icon, title }) {
  const router = useRouter();
  const { state, dispatch } = useAppContext();

  function closeHandler() {
    dispatch({ type: 'SHOW_MODAL' });
    // router.replace('/home');
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.imgContainer}>
          <Image
            source={ICONS[`icon-${state.currentSubject.id}`]}
            resizeMode='contain'
            style={styles.img}
          />
        </View>
        <Text style={styles.title}>
          {removeGeneralCategory(state.currentSubject.name)}
        </Text>
      </View>
      <HeaderIcon
        source={ICONS.closeIcon}
        btnHeight={18}
        btnWidth={18}
        onPress={() => closeHandler()}
      />
    </View>
  );
}
