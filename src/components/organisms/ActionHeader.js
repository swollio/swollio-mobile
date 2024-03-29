import * as React from "react";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import { useNavigation } from "@react-navigation/native";
import Color from "../../styles/Color";
import Font from "../../styles/Font";
import OutlinedButton from "../atoms/OutlinedButton";

export default function Header({ title, onAction }) {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <Icon
        name="arrow-left"
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      />
      <OutlinedButton
        text={title}
        style={styles.buttonStyle}
        onPress={onAction}
      />
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
    paddingHorizontal: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: Font.Header,
    color: Color.SurfaceContrast,
  },
  spacer: { width: 50 },
  backIcon: {
    fontSize: 24,
    padding: 16,
    color: Color.SurfaceContrast,
  },
  buttonStyle: { width: "auto", paddingHorizontal: 16, height: 40 },
});
