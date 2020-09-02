import * as React from "react";
import { Text, View, SafeAreaView } from "react-native";

import RootHeader from "../../components/organisms/RootHeader";

import TabPageStyles from "../styles/TabPage";

export default function CoachStatisticsScreen() {
  return (
    <SafeAreaView style={TabPageStyles.pageContainer}>
      <RootHeader title="Progress." />
      <View style={TabPageStyles.pageMain}>
        <Text>There are no coach statistics at this time.</Text>
      </View>
    </SafeAreaView>
  );
}
