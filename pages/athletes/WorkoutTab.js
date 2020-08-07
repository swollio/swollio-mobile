import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Colors from '../../utilities/Colors';
import { Card, WorkoutCover } from '../../components/Components'
import { getWorkoutsForAthlete } from '../../utilities/api'
import WorkoutProgress from './WorkoutPage'
import LoadingPage from '../LoadingPage';
import moment from 'moment'

export default function WorkoutsPage(props) {

    const [workouts, setWorkouts] = useState(null);
    
    useEffect(() => {
        if (workouts === null) {
            getWorkoutsForAthlete(props.user.athlete_id).then(data => {
                setWorkouts(data);
            });
        }
        return () => {} 
    });


    // This makes a list of WorkoutCover Cards that tell the user metadat
    // about the workout
    const WorkoutCovers = (workouts || []).map((workoutsForDay, index1) => {
        return (
            <View key={index1}>
                <Text style={styles.sectionLabel}>{moment(workoutsForDay.date).format("dddd MMM D")}</Text>
                {
                    workoutsForDay.workouts.map((workout, index2) => {
                        return (
                        <WorkoutCover 
                            key={index2} 
                            completed={workout.completed}
                            color={Colors.Primary} 
                            title={workout.workout_name} 
                            team_name={workout.team_name}
                            created={workout.created}
                            onStartWorkout={() => props.push(() => 
                            <WorkoutProgress 
                                pop={ num => props.pop(num) }
                                push={props.push}
                                workout={workout}
                                user={props.user}
                            />
                            )}
                        />)
                    })
                }
            </View>
        );
    });

    return (
        <View style={{flex: 1}}>
            <View style={styles.header}>
                <Text style={styles.title}>Workouts</Text>
            </View>
            {
                workouts === null && <LoadingPage /> ||
                workouts.length == 0 && <Text style={styles.watermark}>No upcoming workouts</Text> ||
                <ScrollView padding={10}>{WorkoutCovers}</ScrollView>
            }
        </View>
    )
}

/*

*/

const styles = StyleSheet.create({
    header: {
        width: '100%',
        padding: 15,
        paddingLeft: 20,
        paddingBottom: 20,
        backgroundColor: Colors.Primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    sectionLabel: {
        fontSize: 18,
        fontFamily: "Comfortaa_400Regular",
        color: Colors.SurfaceContrast,
        marginTop: 12,
        marginBottom: 12,
    },
    watermark: {
        textAlign: 'center',
        fontSize: 24,
        color: Colors.SurfaceContrast2,
        margin: 50,
    },
    title: {
        fontSize: 32,
        color: Colors.PrimaryContrast,
        fontFamily: 'Comfortaa_700Bold',
        textAlign: 'left',
    }
})