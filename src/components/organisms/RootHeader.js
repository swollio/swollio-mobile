import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

import Color from "../../styles/Color";
import Font from "../../styles/Font";
import SolidButton from "../atoms/SolidButton";
import headerStyles from "./styles/Header";

export default function RootHeader({ title, action, onAction }) {
  return (
    <View style={styles.headerContainer}>
      <Text style={headerStyles.title}>{title}</Text>
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
    backgroundColor: Color.Surface,
    borderBottomWidth: 2,
    padding: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: Font.Header,
    color: Color.SurfaceContrast,
  },
  headerButton: {
    width: 100,
    height: 40,
  },
});
