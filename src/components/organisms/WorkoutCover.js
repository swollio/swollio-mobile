import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Card from "./Card";
import SolidButton from "../atoms/SolidButton";
import Colors from "../../styles/Color";
import Font from "../../styles/Font";

export default function WorkoutCover(props) {
  return (
    <Card barColor={props.color}>
      <View>
        <Text style={styles.workoutTitle}>{props.title}</Text>
        <Text style={styles.workoutSubtitle}>{props.team_name}</Text>
        <View style={styles.cardTextView}>
          {props.completed ? (
            <View style={styles.cardTextRow}>
              <Text style={styles.completedText}>Completed</Text>
              <View style={styles.iconView}>
                <Icon
                  name="check"
                  size={24}
                  style={{ color: Colors.Primary }}
                />
              </View>
            </View>
          ) : (
            <SolidButton
              style={[styles.SolidButton, { borderColor: props.color }]}
              onPress={props.onStartWorkout}
              text="Start"
            />
          )}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  workoutTitle: {
    fontSize: 26,
    fontFamily: Font.Header,
    color: Colors.SurfaceContrast,
    marginLeft: 10,
    marginBottom: 5,
    textAlign: "left",
  },
  workoutSubtitle: {
    fontSize: 18,
    fontFamily: Font.Header,
    color: Colors.SurfaceContrast2,
    marginLeft: 10,
  },
  SolidButton: {
    width: "80%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 25,
    marginTop: 15,
    marginBottom: 10,
  },
  buttonText: {
    color: Colors.PrimaryContrast,
    fontFamily: Font.Header,
    fontSize: 18,
    textAlign: "center",
  },
  iconView: {
    marginVertical: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: Colors.Primary,
  },
  completedText: {
    fontSize: 24,
    fontFamily: Font.Header,
    color: Colors.SurfaceContrast,
    marginHorizontal: 8,
  },
  cardTextView: {
    alignItems: "center",
  },
  cardTextRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
