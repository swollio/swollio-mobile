import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Colors from '../../styles/Color';
import Fonts from '../../styles/Font';

export default function SolidButton(props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.button,
        {margin: props.margin || 0},
        props.disabled
          ? {
              backgroundColor: Colors.Background,
            }
          : {},
        props.style,
      ]}
      onPress={() => !props.disabled && props.onPress()}>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '80%',
    backgroundColor: Colors.Primary,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  text: {
    fontSize: 16,
    fontFamily: Fonts.Header,
    color: Colors.PrimaryContrast,
  },
});
