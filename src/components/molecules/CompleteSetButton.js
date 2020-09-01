import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Colors from '../../styles/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function CompleteSetButton(props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        if (!props.completed) {
          props.onPress();
        }
      }}
      style={[
        styles.circularButton,
        {
          width: 2 * props.radius || 60,
          height: 2 * props.radius || 60,
          borderRadius: props.radius || 30,
          backgroundColor: props.completed
            ? Colors.Primary
            : Colors.SurfaceContrast2,
        },
      ]}>
      <Icon
        name={props.icon}
        style={[styles.circularButtonIcon, {fontSize: props.fontSize || 30}]}
        color={Colors.PrimaryContrast}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  circularButtonIcon: {
    fontSize: 30,
    color: Colors.PrimaryContrast,
  },
  circularButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.Primary,
  },
});
