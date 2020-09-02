import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text, SafeAreaView, ScrollView} from 'react-native';
import {UserContext} from '../../utilities/UserContext';

import RootHeader from '../../components/organisms/RootHeader';

import * as api from '../../utilities/api';
import Colors from '../../styles/Color';
import Font from '../../styles/Font';
import TabPageStyles from '../styles/TabPage';
import {useNavigation} from '@react-navigation/native';
import LoadingPage from '../LoadingPage';
import AbCard from '../../components/organisms/AbCard';
import WorkoutCover from '../../components/organisms/WorkoutCover';
import Card from '../../components/organisms/Card';

export default function AthleteHomeScreen() {
  const {user} = useContext(UserContext);
  const navigation = useNavigation();
  const [todaysWorkouts, setTodaysWorkouts] = useState(null);

  useEffect(() => {
    if (todaysWorkouts === null) {
      api
        .getTodaysWorkoutsForAthlete(user.athlete_id)
        .then((data) => setTodaysWorkouts(data));
    }
    return () => {};
  });

  const abCard = (
    <AbCard
      exercises={[
        'High Plank',
        'Russian Twists',
        'Pidgeon Crunches',
        'Side Plank',
        'Low Plank',
        'Penguins',
        'Crunches',
        'In-and-outs',
        'Reverse Crunches',
        'V-Ups',
        'Bicycle Kicks',
        'Low Plank',
        'Flutter Kicks',
        'Situps',
        'V Sit',
        'Leg Lifts',
        'V Ups',
      ]}
    />
  );

  if (!user) {
    return <LoadingPage />;
  } else {
    return (
      <SafeAreaView style={TabPageStyles.pageContainer}>
        <View style={styles.background}>
          <RootHeader title={`Welcome, ${user.first_name}!`} />
          <ScrollView
            style={styles.scrollViewContainer}
            showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionLabel}>Today</Text>
            {(todaysWorkouts === null && (
              <Card>
                <Text style={[styles.cardTitle, styles.padding]}>
                  Loading...
                </Text>
              </Card>
            )) ||
              (todaysWorkouts.workouts.length === 0 && (
                <Card>
                  <Text style={[styles.cardTitle, styles.padding]}>
                    No Workouts Today
                  </Text>
                </Card>
              )) ||
              todaysWorkouts.workouts.map((workout, index) => {
                return (
                  <WorkoutCover
                    key={index}
                    color={Colors.Primary}
                    completed={workout.completed}
                    title={workout.name}
                    team_name={workout.team_name}
                    created={workout.date}
                    onStartWorkout={() =>
                      navigation.navigate('WorkoutPage', {
                        workout_id: workout.id,
                        assignments: workout.assignments,
                        date: workout.date,
                      })
                    }
                  />
                );
              })}
            <Text style={styles.sectionLabel}>Featured</Text>
            {abCard}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: Colors.SurfaceContrast,
    fontFamily: Font.Header,
    textAlign: 'left',
    marginBottom: 15,
  },
  background: {
    backgroundColor: Colors.Background,
    flex: 1,
  },
  rows: {
    flexDirection: 'row',
    borderColor: '#EEE',
    borderTopWidth: 1,
    padding: 5,
  },
  setWeight: {
    marginTop: 20,
    borderColor: Colors.Primary,
    borderWidth: 1,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  scrollViewContainer: {
    padding: 10,
    flex: 1,
  },
  padding: {
    padding: 16,
  },
  sectionLabel: {
    fontSize: 18,
    fontFamily: Font.Header,
    color: Colors.SurfaceContrast,
    marginTop: 12,
    marginBottom: 12,
  },
});
