import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { TextInput, View, StyleSheet } from "react-native";

import Colors from "../../styles/Color";
import Fonts from "../../styles/Font";

import OutlinedButton from "../atoms/OutlinedButton";
import headerStyles from "./styles/Header";

/**
 * WorkoutDetailsHeader is a header component for displaying workout details.
 * It displays navigation icons ('back' and 'finish') as well as information
 * about a workout such as the date, the repeat status, etc. Future metadata
 * about a workout such as primary muscle groups should be displayed here as
 * well.
 *
 * PropType:
 * - onBack: () => ()
 * - onFinish: () => ()
 * - options: { created: string, repeat: string }
 */
export default function WorkoutDetailsHeader({
  options,
  onBack,
  onFinish,
  onChangeName,
  onToggleCalendar,
  isSavingWorkout,
}) {
  return (
    <View style={[headerStyles.container, headerStyles.header]}>
      <View style={[styles.header, { paddingVertical: 16 }]}>
        <Icon
          name="arrow-left"
          style={[styles.headerIcon, { width: 80 }]}
          onPress={onBack}
        />
        <OutlinedButton
          text={options.id ? "Save Workout" : "Create Workout"}
          onPress={onFinish}
          disabled={isSavingWorkout}
          style={{ width: 160, height: 40 }}
        />
      </View>
      <TextInput
        placeholder="Untitled Workout"
        autoCapitalize="words"
        editable={!isSavingWorkout}
        onChangeText={(text) => onChangeName(text)}
        style={[
          headerStyles.title,
          {
            borderColor: Colors.SurfaceContrast2,
            borderBottomWidth: 1,
            paddingVertical: 8,
          },
          isSavingWorkout && { color: Colors.SurfaceContrast2 },
        ]}
      >
        {options.name}
      </TextInput>
      <View
        style={{
          flexDirection: "row",
          paddingTop: 16,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Icon
          size={36}
          style={{ paddingHorizontal: 16, color: Colors.SurfaceContrast }}
          name="calendar"
        />
        <OutlinedButton
          style={{ width: "auto", paddingHorizontal: 24 }}
          text={`${options.dates.length} workout dates`}
          disabled={isSavingWorkout}
          onPress={onToggleCalendar}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    padding: 16,
    borderColor: Colors.Primary,
    borderBottomWidth: 1,
    backgroundColor: Colors.Surface,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerIcon: {
    fontSize: 30,
    color: Colors.SurfaceContrast,
  },
  headerText: {
    fontSize: 24,
    color: Colors.SurfaceContrast,
    fontFamily: Fonts.Header,
    textAlign: "left",
  },
});
