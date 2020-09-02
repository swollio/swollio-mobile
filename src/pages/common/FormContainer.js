import React from "react";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet } from "react-native";

export default function FormContainer({ children }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={styles.formContainer} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    justifyContent: "space-between",
    alignItems: "stretch",
    flex: 1,
  },
});
