import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import Card from "./Card";
import Colors from "../../styles/Color";
import ScrollPicker from "../molecules/ScrollPicker";
import OutlinedButton from "../atoms/OutlinedButton";
import Fonts from "../../styles/Font";

function AssignmentSetInfoButton(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        styles.setInfoButton,
        { backgroundColor: props.reps === 0 ? "#EEE" : Colors.Primary },
      ]}
    >
      <Text
        style={{
          font: Fonts.Body,
          fontSize: props.reps === 0 ? 14 : 18,
          textAlign: "center",
          color: props.reps === 0 ? "#CCC" : Colors.PrimaryContrast,
        }}
      >
        {props.reps === 0 ? `Set ${props.index + 1}` : props.reps}
      </Text>
    </TouchableOpacity>
  );
}

function AssignmentSetInfo(props) {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        },
        props.style,
      ]}
    >
      {props.sets.map((reps, i) => (
        <AssignmentSetInfoButton
          key={i}
          index={i}
          onPress={() => props.onEdit(i)}
          reps={reps}
        />
      ))}
    </View>
  );
}

/**
 * AssignmentDataCard displays the assignment details including the name
 * of the exercise, and the number of sets/reps that the athlete should
 * complete. This may be extended later to include other assignment options.
 *
 * @param onEdit
 */
function AssignmentDataCard(props) {
  while (props.assignment.rep_count.length < 5) {
    props.assignment.rep_count.push(0);
  }

  return (
    <Card>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.assignmentTitle}>
          {props.assignment.exercise.name}
        </Text>
        <Icon
          size={24}
          onPress={props.onDelete}
          style={{ color: Colors.SurfaceContrast }}
          name="times"
        />
      </View>
      <AssignmentSetInfo
        style={{ marginVertical: 16 }}
        onEdit={props.onEdit}
        sets={props.assignment.rep_count}
      />
    </Card>
  );
}

/**
 * AssignmentEditCard displays a scroll-picker allowing coaches to set the
 * number of reps that should be completed for a specific set.
 *
 * @param onCompleted
 */
function AssignmentEditCard(props) {
  return (
    <Card>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.assignmentTitle}>Edit Rep Count</Text>
        <OutlinedButton
          style={{ width: "auto", height: 40, paddingHorizontal: 16 }}
          text="Remove Set"
          onPress={() => props.onRemove()}
        />
      </View>

      <View style={{ alignItems: "center", padding: 16 }}>
        <ScrollPicker
          style={{ marginVertical: 16 }}
          initialValue={props.initialValue || 10}
          onChange={props.onChange}
          data={[...Array(100).keys()].map((x) => x)}
        />
        <OutlinedButton
          style={{ paddingHorizontal: 16 }}
          onPress={props.onCompleted}
          text="Set Rep Count"
        />
      </View>
    </Card>
  );
}

/**
 * AssignmentCard displays an editable assignment component displaying an
 * exercise name and set series of sets/reps that the athlete should complete.
 *
 * @param assignment - the assignment to edit
 * @param onDelete - callback to delete the assignment
 * @param onUpdate - callback to update the assignment
 */
export default function AssignmentCard(props) {
  // edited contains the index of the set that is currently being edited,
  // or null if no set is being edited.
  const [edited, setEdited] = useState(null);

  return edited === null ? (
    <AssignmentDataCard
      assignment={props.assignment}
      onEdit={(i) => setEdited(i)}
      onDelete={() => props.onDelete(props.assignment)}
    />
  ) : (
    <AssignmentEditCard
      assignment={props.assignment}
      initialValue={props.assignment.rep_count[edited]}
      onChange={(i) => {
        const rep_count = [...props.assignment.rep_count];
        rep_count[edited] = i;
        props.onUpdate({ ...props.assignment, rep_count });
      }}
      onRemove={() => {
        const repCount = [...props.assignment.rep_count];
        repCount.splice(edited, 1);

        while (repCount.length < 5) {
          repCount.push(0);
        }

        props.onUpdate({ ...props.assignment, rep_count: repCount });
        setEdited(null);
      }}
      onCompleted={() => {
        const rep_count = [];

        for (let i = 0; i < 5; i++) {
          const current_reps = props.assignment.rep_count[i];
          if (current_reps !== 0) {
            rep_count.push(current_reps);
          }
        }

        while (rep_count.length < 5) {
          rep_count.push(0);
        }

        props.onUpdate({ ...props.assignment, rep_count });
        setEdited(null);
      }}
    />
  );
}

const styles = StyleSheet.create({
  setInfoButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  assignmentTitle: {
    fontSize: 20,
    color: Colors.SurfaceContrast,
    fontFamily: Fonts.Header,
    textAlign: "left",
  },
  assignmentBody: {
    fontSize: 16,
    color: Colors.SurfaceContrast,
    fontFamily: Fonts.Header,
    textAlign: "left",
    marginTop: 16,
  },
});
