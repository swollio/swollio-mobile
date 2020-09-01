import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function LoadingPage(props) {
  return (
    <View style={styles.loadingView}>
      <Text>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingView: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
