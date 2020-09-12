import React from "react";
import { Text, View, StyleSheet } from "react-native";

import Colors from "../../styles/Color";
import Fonts from "../../styles/Font";

export default function ProfilePicturePlaceholder({ user }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {`${user.first_name[0].toUpperCase()}${user.last_name[0].toUpperCase()}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Background,
    padding: 4,
    height: 44,
    width: 44,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Colors.SurfaceContrast2,
    fontFamily: Fonts.Body,
    fontWeight: "500",
    fontSize: 24,
  },
});
