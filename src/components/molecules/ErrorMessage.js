import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Colors from '../../styles/Color';
import Fonts from '../../styles/Font';

/**
 * The ErrorMessage component displays an error message indicating that some
 * process has failed. It takes two arguments: title and message. If either
 * argument is falsy, the component returns an empty react fragment.
 *
 * @param title - a general label for the error
 * @param message - a specific message indicating what went wrong
 */
export default function ErrorMessage(props) {
  if (!props.title || props.message === null) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <Icon name={'exclamation-triangle'} size={30} style={styles.icon} />
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.message}>{props.message.toString()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderColor: Colors.Error,
    borderWidth: 1,
    borderRadius: 12,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    padding: 12,
    color: Colors.Error,
  },
  title: {
    color: Colors.Error,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: Fonts.Header,
    marginBottom: 2,
  },
  message: {
    color: Colors.Error,
    fontSize: 12,
    fontFamily: Fonts.Header,
  },
});
