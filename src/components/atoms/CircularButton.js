import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Colors from "../../styles/Color";

export default function CircularButton({ style, icon, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.circularButton, style]}
    >
      <Icon
        name={icon}
        style={styles.circularButtonIcon}
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
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.Primary,
  },
});
