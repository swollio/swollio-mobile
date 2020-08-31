import React, {useContext, useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';

import Colors from '../../styles/Color';
import Fonts from '../../styles/Font';
import OutlinedButton from '../atoms/OutlinedButton';
import {WorkoutsContext} from '../../utilities/WorkoutContext';

function GroupedWorkoutItem({groupedWorkouts}) {
  const navigation = useNavigation();
  const day = moment(groupedWorkouts[0].date).format('DD');
  const month = moment(groupedWorkouts[0].date).format('MMM');

  return (
    <View style={styles.groupedWorkoutItem}>
      <View style={styles.groupedWorkoutItemDateContainer}>
        <Text style={styles.groupedWorkoutItemDateTextDay}>{day}</Text>
        <Text style={styles.groupedWorkoutItemDateTextMonth}>{month}</Text>
      </View>
      <View style={styles.groupedWorkoutItemWorkoutContainer}>
        {groupedWorkouts.map((groupedWorkout) => {
          const workout = groupedWorkout.workout;
          return (
            <TouchableOpacity
              style={styles.groupedWorkoutItemWorkout}
              key={groupedWorkout.workout.id}
              onPress={() =>
                navigation.navigate('EditWorkout', {
                  workout,
                })
              }>
              <Text style={styles.groupedWorkoutItemWorkoutText}>
                {workout.name}
              </Text>
              <Icon size={20} name="chevron-right" />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function groupBy(xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

export default function WorkoutList() {
  const {workouts} = useContext(WorkoutsContext);
  const navigation = useNavigation();

  const [groupedWorkouts, setGroupedWorkouts] = useState(null);

  // Whenever the workouts change, recompute the next 5 upcoming
  // workouts grouped by date.
  // TODO: consider moving this functionality to the backend?
  useEffect(() => {
    if (workouts !== null) {
      const unnested = [];
      for (let workout of workouts) {
        for (let date of workout.dates) {
          if (moment.utc(date).isAfter(moment(), 'day')) {
            unnested.push({date, workout});
          }
        }
      }
      unnested.sort((a, b) => moment.utc(a.date) - moment.utc(b.date));
      setGroupedWorkouts(groupBy(unnested.slice(0, 5), 'date'));
    }
  }, [workouts]);

  if (groupedWorkouts === null) return <></>;
  return (
    <View style={styles.cardOuter}>
      <View style={styles.cardInner}>
        <View style={styles.groupedWorkoutHeader}>
          <Text style={styles.cardTitle}>Upcoming</Text>
          <OutlinedButton
            text="Create"
            style={styles.outlinedButton}
            onPress={() =>
              navigation.navigate('EditWorkout', {
                workout: {
                  name: '',
                  dates: [],
                  assignments: [],
                },
              })
            }
          />
        </View>
        {Object.values(groupedWorkouts).map((workoutGroup, i) => (
          <GroupedWorkoutItem key={i} groupedWorkouts={workoutGroup} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  groupedWorkoutItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingVertical: 8,
  },
  groupedWorkoutItemDateContainer: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  groupedWorkoutItemDateTextDay: {
    color: Colors.SurfaceContrast,
    fontSize: 20,
    fontFamily: Fonts.Header,
  },
  groupedWorkoutItemDateTextMonth: {
    fontSize: 12,
    color: Colors.SurfaceContrast2,
    fontFamily: Fonts.Header,
  },
  groupedWorkoutItemWorkoutContainer: {
    borderLeftColor: Colors.SurfaceContrast2,
    borderLeftWidth: 1,
    flex: 1,
    paddingHorizontal: 8,
  },
  groupedWorkoutItemWorkout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#EEE',
    padding: 8,
  },
  groupedWorkoutItemWorkoutText: {
    fontFamily: Fonts.Header,
    fontSize: 20,
  },
  groupedWorkoutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardOuter: {
    backgroundColor: Colors.PrimaryContrast,
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
    marginVertical: 4,
  },
  cardInner: {
    width: '100%',
    borderLeftColor: Colors.Primary,
    borderLeftWidth: 10,
    padding: 8,
  },
  cardTitle: {
    fontFamily: Fonts.Header,
    fontSize: 24,
    fontWeight: 'bold',
  },
  outlinedButton: {
    width: 'auto',
    paddingHorizontal: 16,
    height: 40,
    marginVertical: 4,
  },
});