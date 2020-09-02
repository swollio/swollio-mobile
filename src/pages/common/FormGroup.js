import React from "react";
import { View, StyleSheet } from "react-native";

export default function FormGroup({ children, flex, padding, justifyContent }) {
  return (
    <View style={[styles.formGroup, { flex, justifyContent, padding }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  formGroup: {
    paddingHorizontal: 24,
    alignItems: "stretch",
  },
});
