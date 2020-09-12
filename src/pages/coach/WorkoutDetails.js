import React, { useState, useContext } from "react";
import { Text, SafeAreaView, StyleSheet, View } from "react-native";

import Colors from "../../styles/Color";
import Fonts from "../../styles/Font";

import SolidButton from "../../components/atoms/SolidButton";

import LoadingView from "../../components/molecules/LoadingView";
import WorkoutDetailsHeader from "../../components/organisms/WorkoutDetailHeader";
import WorkoutDetailsAssignments from "../../components/organisms/WorkoutDetailsAssignments";
import Calendar from "../../components/organisms/Calendar";

import useApi from "../../utilities/api";
import { UserContext } from "../../utilities/UserContext";

const usePostWorkout = () => {
  const { user } = useContext(UserContext);
  const { postWorkoutForTeam, postWorkoutForAthlete } = useApi();
  const [state, setState] = useState({ loading: false, response: null });
  const post = async (workout) => {
    if (user.team_id) {
      setState((prev) => ({ ...prev, loading: true }));
      const response = await postWorkoutForTeam(user.team_id, workout);
      setState((prev) => ({ ...prev, loading: false, response }));
    } else {
      setState((prev) => ({ ...prev, loading: true }));
      const response = await postWorkoutForAthlete(user.athlete_id, workout);
      setState((prev) => ({ ...prev, loading: false, response }));
    }
  };

  return [state, post];
};

const useUpdateWorkout = () => {
  const { user } = useContext(UserContext);
  const { updateWorkoutForTeam, updateWorkoutForAthlete } = useApi();
  const [state, setState] = useState({ loading: false, response: null });
  const update = async (workout) => {
    if (user.team_id) {
      setState((prev) => ({ ...prev, loading: true }));
      const response = await updateWorkoutForTeam(user.team_id, workout);
      setState((prev) => ({ ...prev, loading: false, response }));
    } else {
      setState((prev) => ({ ...prev, loading: true }));
      const response = await updateWorkoutForAthlete(user.athlete_id, workout);
      setState((prev) => ({ ...prev, loading: false, response }));
    }
  };

  return [state, update];
};

function WorkoutDetailsCalendarContent({ dates, toggleCalendar, updateDates }) {
  return (
    <View style={styles.calendarContainer}>
      <View style={{ width: "100%", alignItems: "center" }}>
        <Text style={styles.body}>
          Select the days that you want your athletes to complete the workout.
        </Text>
        <Calendar date={dates} onEdit={updateDates} />
      </View>
      <SolidButton
        style={{ width: 200 }}
        text="Done"
        onPress={toggleCalendar}
      />
    </View>
  );
}

function WorkoutDetailsAssignmentsContent({
  navigation,
  assignments,
  addAssignment,
  updateAssignments,
  isSavingWorkout,
}) {
  if (isSavingWorkout) {
    return <LoadingView />;
  }

  return (
    <>
      <WorkoutDetailsAssignments
        onUpdate={updateAssignments}
        assignments={assignments}
      />
      <View style={styles.addExerciseButtonContainer}>
        <SolidButton
          text="Add Exercise"
          style={{ width: 200 }}
          onPress={() =>
            navigation.navigate("ChooseExercise", {
              onChoose: addAssignment,
            })
          }
        />
      </View>
    </>
  );
}

export default function WorkoutDetails({ navigation, route }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [workout, setWorkout] = useState({ ...route.params.workout });
  const [updateState, updateWorkout] = useUpdateWorkout();
  const [postState, postWorkout] = usePostWorkout();
  const isSavingWorkout = updateState.loading || postState.loading;

  const updateName = (name) => {
    if (!isSavingWorkout) {
      setWorkout({ ...workout, name });
    }
  };

  const updateDates = (dates) => {
    if (!isSavingWorkout) {
      setWorkout({ ...workout, dates });
    }
  };

  const updateAssignments = (assignments) => {
    if (!isSavingWorkout) {
      setWorkout({ ...workout, assignments });
    }
  };

  const addAssignment = (exercise) => {
    if (!isSavingWorkout) {
      setWorkout({
        ...workout,
        assignments: [
          ...workout.assignments,
          { exercise, rep_count: [10, 8, 6] },
        ],
      });
    }
  };

  return (
    <>
      <SafeAreaView style={styles.safeAreaTop} />
      <WorkoutDetailsHeader
        options={workout}
        onBack={() => navigation.goBack()}
        onFinish={() => {
          if (workout.id) {
            updateWorkout({
              ...workout,
              name: workout.name || "Untitled Workout",
            }).then(() => navigation.goBack());
          } else {
            postWorkout({
              ...workout,
              name: workout.name || "Untitled Workout",
            }).then(() => navigation.goBack());
          }
        }}
        isSavingWorkout={isSavingWorkout}
        onToggleCalendar={() => setShowCalendar(!showCalendar)}
        onChangeName={updateName}
      />
      <View style={styles.contentContainer}>
        {showCalendar && !isSavingWorkout ? (
          <WorkoutDetailsCalendarContent
            toggleCalendar={() => setShowCalendar(!showCalendar)}
            dates={workout.dates}
            updateDates={updateDates}
          />
        ) : (
          <WorkoutDetailsAssignmentsContent
            navigation={navigation}
            assignments={workout.assignments}
            updateAssignments={updateAssignments}
            addAssignment={addAssignment}
            isSavingWorkout={isSavingWorkout}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaTop: {
    flex: 0,
    backgroundColor: Colors.Surface,
  },
  body: {
    fontSize: 18,
    fontFamily: Fonts.Header,
    color: Colors.SurfaceContrast,
    padding: 24,
  },
  addExerciseButtonContainer: {
    padding: 30,
    position: "absolute",
    alignItems: "flex-end",
    width: 250,
    right: 0,
    bottom: 0,
  },
  calendarContainer: {
    flex: 1,
    paddingBottom: 36,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.Surface,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
});
