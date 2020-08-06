import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import Colors from '../../utilities/Colors';
import Icon from 'react-native-vector-icons/Feather';
import { getAssignmentsForWorkout, postAthleteWorkoutResult } from '../../utilities/api';
import { WorkoutCard } from '../../components/Components';

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

                        // These fields will be changed by the athlete as they complete the workout
                        reps: reps,
                        weight: defaultWeight,
                        created: null,
                        
                    }))
                ));
            });
        }
    });
    
    const Assignments = (assignments || []).map((assignment, index) => {
        return (
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
        );
    })


    return (
        <>
            <SafeAreaView style={styles.safeAreaTop} />
            <View style={styles.header}>
                <Icon 
                    name={'arrow-left'}
                    style={styles.headerIcon}
                    onPress={props.pop}
                />
                <Text style={styles.headerText}>Workout</Text>
                <Icon 
                    name={'check'}
                    style={styles.headerIcon}
                    onPress={() => {
                        postAthleteWorkoutResult(
                            props.user.athlete_id,
                            props.workout.id,
                            results.flat().filter(x => x.created !== null)
                        ).then(() => {
                            props.pop()
                        })
                    }}
                />
            </View>
            <ScrollView padding={10} style={{backgroundColor: Colors.Background}}>
                { Assignments }
            </ScrollView>
        </>

    );
}


const styles = StyleSheet.create({
    safeAreaTop: {
        flex: 0,
        backgroundColor: Colors.Primary
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8,
        backgroundColor: Colors.Primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerIcon: {
        fontSize: 30,
        color: Colors.PrimaryContrast,
    },
    headerText: {
        fontSize: 24,
        color: Colors.PrimaryContrast,
        fontFamily: 'Comfortaa_700Bold',
        textAlign: 'left',
    }
})