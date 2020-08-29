import React, {useContext, useEffect} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Colors from '../../styles/Color';
import Fonts from '../../styles/Font';
import * as api from '../../utilities/api';
import moment from 'moment';
import OutlinedButton from '../atoms/OutlinedButton';

import {WorkoutsContext} from '../../utilities/WorkoutContext';

function WorkoutListItem({date, workout}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('EditWorkout', {workout})}
      style={styles.athleteListItem}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: Colors.Primary,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: Colors.PrimaryContrast,
                fontSize: 16,
                fontFamily: Fonts.Header,
              }}>
              {moment.utc(date).format('DD')}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              fontFamily: Fonts.Header,
            }}>
            {moment.utc(date).format('MMM')}
          </Text>
        </View>
        <Text style={styles.athleteListItemText}>{workout.name}</Text>
      </View>
      <Icon size={20} name="chevron-right"></Icon>
    </TouchableOpacity>
  );
}

export default function WorkoutList() {
  const {workouts} = useContext(WorkoutsContext);
  const navigation = useNavigation();

  if (workouts === null) return <></>;

  const unnested = [];

  for (workout of workouts) {
    for (date of workout.dates) {
      if (moment.utc(date).isAfter(moment(), 'day')) {
        unnested.push({date, workout});
      }
    }
  }

  unnested.sort((a, b) => moment.utc(a.date) - moment.utc(b.date));

  return (
    <View style={styles.cardOuter}>
      <View style={styles.cardInner}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.cardTitle}>Upcoming</Text>
          <OutlinedButton
            text="Create"
            onPress={() =>
              navigation.navigate('EditWorkout', {
                workout: {
                  name: '',
                  dates: [],
                  assignments: [],
                },
              })
            }
            style={{
              width: 'auto',
              paddingHorizontal: 16,
              height: 40,
              marginVertical: 4,
            }}
          />
        </View>
        {unnested.slice(0, 3).map((workoutInstance, i) => (
          <WorkoutListItem key={i} {...workoutInstance} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  athleteListItem: {
    width: '100%',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  athleteListItemText: {
    fontFamily: Fonts.Header,
    fontSize: 20,
    marginLeft: 16,
  },
});
