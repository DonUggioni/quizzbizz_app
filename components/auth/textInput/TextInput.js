import { Image, Pressable, View } from 'react-native';
import { TextInput } from 'react-native';
import { useState } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { styles } from './textInput.styles';
import { COLORS, ICONS, SIZES } from '../../../constants';

export default function Input({
  onChangeText,
  label,
  inputValue,
  secureTextEntry,
  icon,
  view,
  onPress,
}) {
  const [isFocused, setIsFocused] = useState(false);

  const labelPosition = useSharedValue(0);

  function handleFocus() {
    setIsFocused(true);
    labelPosition.value = withTiming(-22, {
      duration: 200,
      easing: Easing.inOut(Easing.ease),
    });
  }

  function handleBlur() {
    if (inputValue === '') {
      setIsFocused(false);
      labelPosition.value = withTiming(0, {
        duration: 200,
        easing: Easing.inOut(Easing.ease),
      });
    }
  }

  const labelStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: 10,
    top: labelPosition.value,
    fontSize: isFocused ? SIZES.small : SIZES.medium,
    color: COLORS.grey500,
    transform: [{ translateY: 8 }],
  }));

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.label, labelStyle]}>{label}</Animated.Text>
      <TextInput
        style={styles.input}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={onChangeText}
        cursorColor={COLORS.blue500}
        autoComplete='off'
        autoCapitalize='none'
        secureTextEntry={secureTextEntry}
      />
      {icon && (
        <Pressable style={styles.imageContainer} onPress={onPress}>
          <Image
            source={!view ? ICONS.viewIcon : ICONS.hideIcon}
            style={styles.img}
          />
        </Pressable>
      )}
    </View>
  );
}
