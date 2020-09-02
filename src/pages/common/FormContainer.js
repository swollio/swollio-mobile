import React from "react";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet } from "react-native";
import Colors from "../../styles/Color";

export default function FormContainer({ children }) {
  return (
    <SafeAreaView style={styles.backgound}>
      <KeyboardAvoidingView style={styles.formContainer} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgound: {
    flex: 1,
    backgroundColor: Colors.PrimaryContrast,
  },
  formContainer: {
    justifyContent: "space-between",
    alignItems: "stretch",
    flex: 1,
  },
});
