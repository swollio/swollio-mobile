import React from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import Colors from "../../styles/Color";
import WaterMark from "./WaterMark";
import AssignmentCard from "./AssignmentCard";

export default function WorkoutDetailsAssignments(props) {
  if (props.assignments.length === 0) {
    return (
      <WaterMark title="No Exercises Selected">
        <Text style={styles.watermarkText}>
          Add exercises to this workout to get started. You will be able to
          choose from a list of curated exercises, or create your own!
        </Text>
      </WaterMark>
    );
  }

  return (
    <ScrollView
      width="100%"
      contentContainerStyle={styles.assignmentScrollView}
    >
      {props.assignments.map((assignment, i) => (
        <AssignmentCard
          key={i}
          assignment={assignment}
          onDelete={() => {
            const assignments = [...props.assignments];
            assignments.splice(i, 1);
            props.onUpdate(assignments);
          }}
          onUpdate={(a) => {
            const assignments = [...props.assignments];
            assignments[i] = a;
            props.onUpdate(assignments);
          }}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  assignmentScrollView: {
    flex: 1,
    padding: 8,
    paddingBottom: 100,
  },
  watermarkText: {
    fontSize: 16,
    textAlign: "center",
    padding: 24,
    color: Colors.SurfaceContrast2,
  },
});
