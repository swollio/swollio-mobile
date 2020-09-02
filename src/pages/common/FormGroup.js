import React from "react";
import { View, StyleSheet } from "react-native";

export default function FormGroup({ children, flex, justifyContent }) {
  return (
    <View style={[styles.formGroup, { flex, justifyContent }]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  formGroup: {
    padding: 24,
    alignItems: "stretch",
  },
});
