import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, SafeAreaView } from 'react-native';
import Colors from '../../utilities/Colors';
import Icon from 'react-native-vector-icons/Feather';
import { getAssignmentsForWorkout, postAthleteWorkoutResult } from '../../utilities/api';
import { WorkoutCard } from '../../components/Components';
import PostWorkoutSurvey from '../../forms/PostWorkoutSurvey';
import LoadingPage from '../LoadingPage';
import OutlinedButton from '../../components/OutlinedButton'
import headerStyles from '../styles/Header'

/**
 * Header is the header component for the Athlete Workout Page.
 * It contains a back button as well as a check button to mark the
 * workout as completed.
 * 
 * @param pop
 * @param setComplete
 */
function Header(props) {
    return (
        <View style={[headerStyles.container, headerStyles.header, {    
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }]}>
            <Icon 
                name={'arrow-left'}
                style={headerStyles.text}
                size={36}
                onPress={props.pop}
                
            />
            <Text style={headerStyles.title}>Workout</Text>
            <Icon 
                name={'check'}
                style={headerStyles.text}
                size={36}
                onPress={() => props.setComplete(true)}
            />
        </View>
    )
}

/**
 * WorkoutCompleteConfirmation informs the user that their workout is
 * complete, and asks them to confirm that they wish to complete the workout.
 * @param {*} props 
 */
function WorkoutCompleteConfirmation(props) {
    return (
        <SafeAreaView style={{height: "100%"}}>
            <Icon 
                name={'arrow-left'}
                style={{fontSize: 36, padding: 16}}
                onPress={() => props.setComplete(false)}
            />
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
            }}>
                <Text style={[headerStyles.title, {textAlign: 'center', marginBottom: 24}]}>
                    Workout Complete!
                </Text>
                <Text style={[headerStyles.subtitle, { textAlign: 'center', marginBottom: 24 }]}>
                    Once you proceed, you will be not be able to make any changes.
                </Text>
                <Text style={[headerStyles.subtitle, { textAlign: 'center', marginBottom: 36 }]}>
                    If you are done, press submit and continue on to the post-workout survey.
                </Text>
                
                <OutlinedButton
                    text={'Submit Workout'}
                    onPress={() =>        
                        postAthleteWorkoutResult(
                            props.user.athlete_id,
                            props.workout.id,
                            props.results.flat().filter(x => x.created !== null)
                        ).then(() => {
                            props.push(() => // Push the PostWorkoutSurvey onto the stack
                                <PostWorkoutSurvey
                                    pop={num => props.pop(num) }
                                    workout={props.workout}
                                    user={props.user}
                                    push={props.push}
                                />
                            );
                        })
                    }
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
 * 
 * Props:
 * - user {User}
 * - workout {Workout}
 * - push: () => void
 * - pop: (React.Component) => void
 */
export default function WorkoutPage(props) {
    
    // The list of assignments to be completed by the athlete
    const [assignments, setAssignments] = useState(null);

    // Pass down to get results
    const defaultWeight = 60;

    /*
     * Results stores a 2D array of workout_results.
     * The outer array groups results by exercise.
     * The inner array stores the result from an individual set.
     * The reason for storing it in this manner is to easily pass
     * the results for a single exercise to a workout card.
     */
    const [results, setResults] = useState(null);
    const [complete, setComplete] = useState(false);

    // Load the list of assignments
    useEffect(() => {
        if (assignments === null) {
            getAssignmentsForWorkout(props.user.athlete_id, props.workout.id).then(assignments => {
                setAssignments(assignments);

                // Outer map traverses by assignment (so each inner array will have the same exercise_id)
                setResults(assignments.map(
                    
                    // Since there are rep_count.length number of reps, we are going to 
                    // make each element of the inner array an object that defaults to
                    // the rep_count as that index, a default weight, and the exercise id
                    assignment => assignment.rep_count.map(reps => ({
                        
                        // These fields are constant and will never be changed by the athlete
                        assignment_id: assignment.id,
                        exercise_id: assignment.exercise_id,
                        initalReps: reps,
                        date: props.workout.date,

                        // These fields will be changed by the athlete as they complete the workout
                        reps: reps,
                        weight: defaultWeight,
                        created: null,
                        
                    }))
                ));
            });
        }
    });
    
    return (
        complete
        && <WorkoutCompleteConfirmation 
            user={props.user}
            push={props.push}
            pop={props.pop}
            workout={props.workout}
            results={results}
            setComplete={(b) => setComplete(b)}
        />
        || <View style={{height: '100%', backgroundColor: Colors.Background}}>
            <SafeAreaView style={headerStyles.safeAreaTop} />
            <Header 
                pop={props.pop}
                setComplete={(b) => setComplete(b)}
            />
            {
                (assignments === null &&
                    <LoadingPage />) ||
                (assignments.length == 0 &&
                    <WaterMark title={'No Assignments'} />) ||
                <ScrollView padding={10} style={{flex: 1}}>
                {
                    assignments.map((assignment, index) => (
                        <WorkoutCard 
                            key = {index}
                            exercise_id = {assignment.exercise_id}
                            results = {results === null ? null: results[index]}
                            onChange = {(resultObj) => {
                                if (!results) return;
                                results[index] = resultObj;
                                setResults([...results]);
                            }}
                            selectColor = {Colors.Primary}
                            barColor = {Colors.Primary}
                            title={assignment.name}
                        />
                    ))
                }
                </ScrollView>
            }
        </View>
    );
}
