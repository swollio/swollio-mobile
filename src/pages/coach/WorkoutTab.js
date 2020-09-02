import React from "react";
import { View, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import RootHeader from "../../components/organisms/RootHeader";
import WorkoutList from "../../components/organisms/WorkoutList";

import TabPageStyles from "../styles/TabPage";

export default function CoachWorkoutsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={TabPageStyles.pageContainer}>
      <RootHeader
        title="Workouts."
        action="Create"
        onAction={() => {
          navigation.navigate("EditWorkout", {
            workout: {
              name: "",
              dates: [],
              assignments: [],
            },
          });
        }}
      />
      <View style={TabPageStyles.pageMain}>
        <WorkoutList />
      </View>
    </SafeAreaView>
  );
}
