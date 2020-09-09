import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import Colors from "../../styles/Color";

export default function FormContainer({ children }) {
  return (
    <SafeAreaView style={styles.backgound}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.formContainer}
        behavior="padding"
      >
        <View style={{ flex: 1 }}>{children}</View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgound: {
    flex: 1,
    backgroundColor: Colors.Surface,
  },
  formContainer: {
    alignItems: "stretch",
    flex: 1,
    padding: 24,
  },
});
