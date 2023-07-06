import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { Button } from 'react-native-paper';
import { styles } from './selector.styles';
import { COLORS } from '../../../constants';

import { capitalizeFirstChar } from '../../../utils/functions';

export default function Selector({ title, data, onSelected, currentValue }) {
  const [isActive, setIsActive] = useState(null);

  function selectHandler(item) {
    setIsActive(item.id);
    onSelected(item);
  }

  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text}>
          Current: <Text style={styles.highLight}>{currentValue}</Text>
        </Text>
      </View>
      <ScrollView style={styles.btnContainer} horizontal={true}>
        {data.map((item, index) => {
          return (
            <Button
              mode={isActive === index + 1 ? 'contained' : 'outlined'}
              onPress={() => selectHandler(item)}
              style={styles.btn}
              textColor='white'
              labelStyle={styles.btnText}
              theme={{ colors: { primary: COLORS.orange } }}
              rippleColor={'transparent'}
              accessibilityLabel={data.text}
              key={item.id}
            >
              {capitalizeFirstChar(item.text)}
            </Button>
          );
        })}
      </ScrollView>
    </View>
  );
}
