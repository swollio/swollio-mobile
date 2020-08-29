import React, {useState, useContext} from 'react';
import {
  StatusBar,
  LogBox,
  Text,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import Colors from '../../styles/Color';
import Fonts from '../../styles/Font';

import SolidButton from '../../components/atoms/SolidButton';

import WorkoutDetailsHeader from '../../components/organisms/WorkoutDetailHeader';
import WorkoutDetailsAssignments from '../../components/organisms/WorkoutDetailsAssignments';
import Calendar from '../../components/organisms/Calendar';

import * as api from '../../utilities/api';
import {UserContext} from '../../utilities/UserContext';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const usePostWorkout = () => {
  const {user} = useContext(UserContext);
  const [state, setState] = useState({loading: false, result: null});
  const post = async (workout) => {
    setState((prev) => ({...prev, loading: true}));
    const response = await api.postWorkoutForTeam(user.team_id, workout);
    const result = await response.text();
    setState((prev) => ({...prev, loading: false, result}));
  };

  return [state, post];
};

function WorkoutDetailsCalendarContent({dates, toggleCalendar, updateDates}) {
  return (
    <View style={styles.calendarContainer}>
      <View style={{width: '100%', alignItems: 'center'}}>
        <Text style={styles.body}>
          Select the days that you want your athletes to complete the workout.
        </Text>
        <Calendar date={dates} onEdit={updateDates} />
      </View>
      <SolidButton text={'Done'} onPress={toggleCalendar} />
    </View>
  );
}

function WorkoutDetailsAssignmentsContent({
  navigation,
  assignments,
  addAssignment,
  updateAssignments,
}) {
  return (
    <>
      <WorkoutDetailsAssignments
        onUpdate={updateAssignments}
        assignments={assignments}
      />
      <View style={styles.addExerciseButtonContainer}>
        <SolidButton
          text={'Add Exercise'}
          onPress={() =>
            navigation.navigate('ChooseExercise', {
              onChoose: addAssignment,
            })
          }
        />
      </View>
    </>
  );
}

export default function WorkoutDetails({navigation, route}) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [workout, updateWorkout] = useState({...route.params.workout});
  const [, postWorkout] = usePostWorkout();

  const updateName = (name) => {
    updateWorkout({...workout, name});
  };

  const updateDates = (dates) => {
    updateWorkout({...workout, dates});
  };

  const updateAssignments = (assignments) => {
    updateWorkout({...workout, assignments});
  };

  const addAssignment = (exercise) => {
    updateWorkout({
      ...workout,
      assignments: [...workout.assignments, {exercise, rep_count: [10, 8, 6]}],
    });
  };

  return (
    <>
      <SafeAreaView style={styles.safeAreaTop} />
      <StatusBar barStyle="dark-content" />
      <WorkoutDetailsHeader
        options={workout}
        onBack={() => navigation.goBack()}
        onFinish={() => {
          postWorkout(workout);
          navigation.goBack();
        }}
        onToggleCalendar={() => setShowCalendar(!showCalendar)}
        onChangeName={updateName}
      />
      <View style={styles.contentContainer}>
        {showCalendar ? (
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
    padding: 24,
  },
  addExerciseButtonContainer: {
    padding: 30,
    position: 'absolute',
    alignItems: 'flex-end',
    width: 250,
    right: 0,
    bottom: 0,
  },
  calendarContainer: {
    flex: 1,
    paddingBottom: 36,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.Surface,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
});
