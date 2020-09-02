import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import Colors from "../../styles/Color";
import Fonts from "../../styles/Font";

export default function OutlinedButton({ margin, style, text, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.optionButton, { margin }, style]}
      onPress={onPress}
    >
      <Text style={styles.title}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  title: {
    color: Colors.Primary,
    fontSize: 16,
    fontFamily: Fonts.Header,
    textAlign: "center",
  },
  optionButton: {
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: Colors.Primary,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
});
