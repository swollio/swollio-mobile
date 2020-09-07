import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../styles/Color";
import Fonts from "../../styles/Font";

export default function WaterMark({ title, children, style }) {
  return (
    <View
      style={[
        {
          flex: 1,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
    >
      <Text style={styles.watermark}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  watermark: {
    fontSize: 24,
    padding: 12,
    textAlign: "center",
    width: "100%",
    color: Colors.SurfaceContrast2,
    fontFamily: Fonts.Body,
  },
});
