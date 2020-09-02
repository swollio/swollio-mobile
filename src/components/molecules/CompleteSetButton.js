import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Colors from "../../styles/Color";

export default function CompleteSetButton({
  completed,
  onPress,
  radius,
  icon,
  fontSize,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        if (!completed) {
          onPress();
        }
      }}
      style={[
        styles.circularButton,
        {
          width: 2 * radius || 60,
          height: 2 * radius || 60,
          borderRadius: radius || 30,
          backgroundColor: completed ? Colors.Primary : Colors.SurfaceContrast2,
        },
      ]}
    >
      <Icon
        name={icon}
        style={[styles.circularButtonIcon, { fontSize: fontSize || 30 }]}
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.Primary,
  },
});
