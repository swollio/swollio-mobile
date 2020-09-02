import React from "react";
import { ActivityIndicator, View } from "react-native";

import Colors from "../../styles/Color";

export default function LoadingView() {
  return (
    <View style={{ padding: 32, flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" color={Colors.SurfaceContrast2} />
    </View>
  );
}
