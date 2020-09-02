import React, {useContext} from 'react';
import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';

import RootHeader from '../../components/organisms/RootHeader';
import WaterMark from '../../components/organisms/WaterMark';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

import TabPageStyles from '../styles/TabPage';
import LoadingPage from '../LoadingPage';
import WorkoutCover from '../../components/organisms/WorkoutCover';
import Colors from '../../styles/Color';
import {AthleteWorkoutContext} from '../../utilities/AthleteWorkoutContext';
import Font from '../../styles/Font';

function GroupedWorkoutCovers(props) {
  const navigation = useNavigation();
  return props.workouts.map((workout, index) => (
    <WorkoutCover
      key={index}
      completed={workout.completed}
      color={Colors.Primary}
      title={workout.name}
      team_name={workout.team_name}
      created={workout.created}
      onStartWorkout={() =>
        navigation.navigate('WorkoutPage', {
          workout_id: workout.id,
          assignments: workout.assignments,
          date: props.date,
        })
      }
    />
  ));
}

function WorkoutCovers(props) {
  return (props.workouts || []).map((workoutsGroupedByDate, index) => (
    <View key={index}>
      <Text style={styles.sectionLabel}>
        {moment(workoutsGroupedByDate.date).format('dddd MMM D')}
      </Text>
      <GroupedWorkoutCovers
        key={index}
        workout_id={workoutsGroupedByDate.workout_id}
        workouts={workoutsGroupedByDate.workouts}
        date={workoutsGroupedByDate.date}
      />
    </View>
  ));
}

export default function AthleteWorkoutsScreen(props) {
  const workoutsContext = useContext(AthleteWorkoutContext);
  const workouts = workoutsContext.workouts;

  return (
    <SafeAreaView style={TabPageStyles.pageContainer}>
      <View style={TabPageStyles.pageMain}>
        <RootHeader title={'Workouts.'} />
        {(workouts === null && <LoadingPage />) ||
          (workouts.length === 0 && (
            <WaterMark title={'No Upcoming Workouts'} />
          )) || (
            <ScrollView padding={10}>
              <WorkoutCovers workouts={workouts} />
            </ScrollView>
          )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionLabel: {
    fontSize: 18,
    fontFamily: Font.Header,
    color: Colors.SurfaceContrast,
    marginTop: 12,
    marginBottom: 12,
  },
});
