import React, { useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import TabPageStyles from "../../pages/styles/TabPage";
import LoadingView from "../molecules/LoadingView";
import Color from "../../styles/Color";
import Font from "../../styles/Font";
import WaterMark from "./WaterMark";
import { WorkoutsContext } from "../../utilities/WorkoutContext";

function WorkoutListItem({ exercise }) {
  return (
    <View style={styles.workoutListItem}>
      <Text style={styles.workoutListItemText}>{exercise.name}</Text>
    </View>
  );
}

export default function WorkoutList() {
  const { workouts } = useContext(WorkoutsContext);

  const navigation = useNavigation();

  if (workouts === null) {
    return <LoadingView />;
  }
  if (workouts.length === 0) {
    return <WaterMark title="No Workouts" />;
  }

  return (
    <ScrollView style={TabPageStyles.scrollView}>
      {workouts.map((workout, index) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EditWorkout", { workout });
          }}
          key={workout.id}
          style={styles.cardOuter}
        >
          <View style={styles.cardInner}>
            <Text style={styles.cardTitle}>{workout.name}</Text>
            {workout.assignments.map((assignment) => (
              <WorkoutListItem key={assignment.id} {...assignment} />
            ))}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  workoutListItem: {
    width: "100%",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: Color.Background,
  },
  cardOuter: {
    backgroundColor: Color.Surface,
    width: "100%",
    borderRadius: 4,
    overflow: "hidden",
    marginVertical: 4,
  },
  cardInner: {
    width: "100%",
    borderLeftColor: Color.Primary,
    borderLeftWidth: 10,
    padding: 8,
  },
  cardTitle: {
    fontFamily: Font.Header,
    color: Color.SurfaceContrast,
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 4,
  },
  workoutListItemText: {
    fontFamily: Font.Body,
    color: Color.SurfaceContrast,
    fontSize: 16,
  },
});
