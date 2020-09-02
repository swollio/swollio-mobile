import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

import Color from "../../styles/Color";
import Font from "../../styles/Font";
import SolidButton from "../atoms/SolidButton";

export default function RootHeader({ title, action, onAction }) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
      {action ? (
        <SolidButton
          text={action}
          style={styles.headerButton}
          onPress={onAction}
        />
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: Color.Primary,
    backgroundColor: Color.PrimaryContrast,
    borderBottomWidth: 2,
    padding: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: Font.Header,
  },
  headerButton: {
    width: 100,
    height: 40,
  },
});
