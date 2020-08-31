import React, {useState, useContext} from 'react';
import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../styles/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as api from '../../utilities/api';
import WorkoutCard from '../../components/organisms/WorkoutCard';
import LoadingPage from '../LoadingPage';
import WaterMark from '../../components/organisms/WaterMark';
import OutlinedButton from '../../components/atoms/SolidButton';
import headerStyles from '../../components/organisms/styles/Header';
import {UserContext} from '../../utilities/UserContext';

/**
 * Header is the header component for the Athlete Workout Page.
 * It contains a back button as well as a check button to mark the
 * workout as completed.
 *
 * @param setComplete
 */
function Header(props) {
  const navigation = useNavigation();
  return (
    <View
      style={[headerStyles.container, headerStyles.header, styles.headerStyle]}>
      <Icon
        name={'arrow-left'}
        style={headerStyles.text}
        size={36}
        onPress={navigation.goBack()}
      />
      <Text style={headerStyles.title}>Workout</Text>
      <Icon
        name={'check'}
        style={headerStyles.text}
        size={36}
        onPress={() => props.setComplete(true)}
      />
    </View>
  );
}

/**
 * WorkoutCompleteConfirmation informs the user that their workout is
 * complete, and asks them to confirm that they wish to complete the workout.
 * @param {*} props
 */
function WorkoutCompleteConfirmation(props) {
  const {athlete_id} = useContext(UserContext);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeAreaHeader}>
      <Icon
        name={'arrow-left'}
        style={headerStyles.text}
        size={36}
        onPress={() => props.setComplete(false)}
      />
      <View style={styles.completeView}>
        <Text style={[headerStyles.title, styles.completeText]}>
          Workout Complete!
        </Text>
        <Text style={[headerStyles.subtitle, styles.completeText]}>
          Once you proceed, you will be not be able to make any changes.
        </Text>
        <Text style={[headerStyles.subtitle, styles.completeSubText]}>
          If you are done, press submit and continue on to the post-workout
          survey.
        </Text>

        <OutlinedButton
          text={'Submit Workout'}
          onPress={() => {
            if (athlete_id === null) {
              return;
            }
            api
              .postAthleteWorkoutResult(
                athlete_id,
                props.workout.id,
                props.results.flat().filter((x) => x.created !== null),
              )
              .then(() => {
                navigation.navigate('PostWorkoutSurvey', props.workout);
              });
          }}
        />
      </View>
    </SafeAreaView>
  );
}

/**
 * The WorkoutPage component is the root level container which displays
 * a list of exercise assignments to be completed be the user. Additionally,
 * It stores the current state of the workout progress. Upon workout completion,
 * it sends the results of the workout to the server.
 */
export default function WorkoutPage(props) {
  // The list of assignments to be completed by the athlete
  const assignments = props.route.params;
  console.log(assignments);
  /*
   * Results stores a 2D array of workout_results.
   * The outer array groups results by exercise.
   * The inner array stores the result from an individual set.
   * The reason for storing it in this manner is to easily pass
   * the results for a single exercise to a workout card.
   */
  const [results, setResults] = useState(null);
  const [complete, setComplete] = useState(false);
  const navigation = useNavigation();

  return (
    (complete && (
      <WorkoutCompleteConfirmation
        workout={props.workout}
        results={results}
        setComplete={(b) => setComplete(b)}
      />
    )) || (
      <View style={styles.workoutBackground}>
        <SafeAreaView style={headerStyles.safeAreaTop} />
        <Header pop={navigation.goBack()} setComplete={(b) => setComplete(b)} />
        {(assignments === null && <LoadingPage />) ||
          (assignments.length === 0 && (
            <WaterMark title={'No Assignments'} />
          )) || (
            <ScrollView padding={10} style={styles.flex}>
              {assignments.map((assignment, index) => (
                <WorkoutCard
                  key={index}
                  exercise_id={assignment.exercise.id}
                  results={results === null ? null : results[index]}
                  onChange={(resultObj) => {
                    if (!results) {
                      return;
                    }
                    results[index] = resultObj;
                    setResults([...results]);
                  }}
                  selectColor={Colors.Primary}
                  barColor={Colors.Primary}
                  title={assignment.exercise.name}
                />
              ))}
            </ScrollView>
          )}
      </View>
    )
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  safeAreaHeader: {
    height: '100%',
  },
  workoutBackground: {
    height: '100%',
    backgroundColor: Colors.Background,
  },
  completeView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  completeText: {
    textAlign: 'center',
    marginBottom: 24,
  },
  completeSubText: {
    textAlign: 'center',
    marginBottom: 36,
  },
  flex: {
    flex: 1,
  },
});
