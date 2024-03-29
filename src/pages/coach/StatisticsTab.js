import * as React from "react";
import { View, SafeAreaView } from "react-native";

import RootHeader from "../../components/organisms/RootHeader";
import WaterMark from "../../components/organisms/WaterMark";
import TabPageStyles from "../styles/TabPage";

export default function CoachStatisticsScreen() {
  return (
    <SafeAreaView style={TabPageStyles.pageContainer}>
      <RootHeader title="Progress" />
      <View style={TabPageStyles.pageMain}>
        <WaterMark title="There are no coach statistics at this time." />
      </View>
    </SafeAreaView>
  );
}
