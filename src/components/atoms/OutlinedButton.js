import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import Colors from "../../styles/Color";
import Fonts from "../../styles/Font";

export default function OutlinedButton({
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
        styles.optionButton,
        { margin },
        style,
        disabled && {
          borderColor: Colors.Background,
        },
      ]}
      onPress={() => (!disabled ? onPress() : null)}
    >
      <Text
        style={[
          styles.title,
          disabled && {
            color: Colors.Background,
          },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  title: {
    color: Colors.Primary,
    fontSize: 16,
    fontFamily: Fonts.Body,
    textAlign: "center",
  },
  optionButton: {
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.Primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
