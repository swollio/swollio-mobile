import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Colors from "../../styles/Color";
import Fonts from "../../styles/Font";

export default function SolidButton({
  margin,
  disabled,
  style,
  text,
  onPress,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.button,
        { margin: margin || 0 },
        disabled
          ? {
              backgroundColor: Colors.Background,
            }
          : {},
        style,
      ]}
      onPress={() => !disabled && onPress()}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.Primary,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  text: {
    fontSize: 16,
    fontFamily: Fonts.Header,
    color: Colors.PrimaryContrast,
  },
});
