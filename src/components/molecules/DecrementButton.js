import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../styles/Color";
import Font from "../../styles/Font";

/**
 * This functional component is a button decrementer that will
 * be used in places like rep counter. The props will be:
 * val - the maximum and initial value of the button (required)
 * onPress - the action necessary on press of the button (optional)
 */
export default function DecrementButton({ style, value, maxValue, onChange }) {
  function onPress() {
    if (value > 1) {
      onChange(value - 1);
    } else {
      onChange(maxValue);
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.button, style]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{value}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 22,
    fontFamily: Font.Header,
    color: Colors.PrimaryContrast,
  },
});
