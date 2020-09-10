import React from "react";
import { ActivityIndicator, View } from "react-native";

import Colors from "../../styles/Color";

export default function LoadingView({ style }) {
  return (
    <View style={[{ padding: 32, flex: 1, justifyContent: "center" }, style]}>
      <ActivityIndicator size="large" color={Colors.SurfaceContrast2} />
    </View>
  );
}
