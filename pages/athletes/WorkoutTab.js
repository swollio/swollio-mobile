import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Colors from '../../utilities/Colors';
import { getWorkoutsForAthlete } from '../../utilities/api'
import WorkoutPage from './WorkoutPage'
import LoadingPage from '../LoadingPage';
import moment from 'moment'

import headerStyles from '../styles/Header'

import WorkoutCover from '../../components/Cards/WorkoutCover'
import WaterMark from '../../components/WaterMark';

/**
 * GroupedWorkoutCards takes a list of workouts which are associated in some
 * way and renders them together in a way which makes it clear that
 * they are part of a logical grouping.
 * 
 * @param workouts - a list of workouts 
 * @param push
 * @param pop
 * @param user
 */
function GroupedWorkoutCovers(props) {
    return props.workouts.map((workout, index) => (
        <WorkoutCover 
            key={index} 
            completed={workout.completed}
            color={Colors.Primary} 
            title={workout.workout_name} 
            team_name={workout.team_name}
            created={workout.created}
            onStartWorkout={() => 
                props.push(() => 
                    <WorkoutPage 
                        pop={props.pop}
                        push={props.push}
                        workout={workout}
                        user={props.user}
                    />
                )
            }
        />
    ))
}

/**
 * WorkoutCovers takes a list of workouts grouped by date and renders the
 * workouts as workout covers grouped together by date
 *
 * @param workouts - a list of workouts grouped by date
 * @param push
 * @param pop
 * @param user
 */
function WorkoutCovers(props) {

    return (props.workouts || []).map((workoutsGroupedByDate, index) => (
        <View key={index}>
            <Text style={styles.sectionLabel}>
                {moment(workoutsGroupedByDate.date).format("dddd MMM D")}
            </Text>
            <GroupedWorkoutCovers
                key={index} 
                push={props.push}
                pop={props.pop}
                user={props.user}
                workouts={workoutsGroupedByDate.workouts}
            />
        </View>
    ));
}

export default function WorkoutsTab(props) {

    /* 
     * Load the workouts for an athlete. Initially, the workout list is set to
     * null, indicating that it hasn't been loaded yet. Once the workout is
     * loaded, it will never be null. In the case that the athlete has no
     * assigned workouts, workouts will be an empty array.
     */
    const [workouts, setWorkouts] = useState(null);
    useEffect(() => {
        if (workouts === null) {
            getWorkoutsForAthlete(props.user.athlete_id).then(data => {
                setWorkouts(data);
            });
        }
        return () => {} 
    });
    
    return (
        <View style={{flex: 1}}>
            <View style={[headerStyles.container, headerStyles.header]}>
                <Text style={headerStyles.title}>Workouts</Text>
            </View>
            {
                (workouts === null &&
                    <LoadingPage />) ||
                (workouts.length == 0 &&
                    <WaterMark title={'No Upcoming Workouts'} />) ||
                <ScrollView padding={10}>
                    <WorkoutCovers
                        push={props.push}
                        pop={props.pop}
                        user={props.user}
                        workouts={workouts}
                    />
                </ScrollView>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    sectionLabel: {
        fontSize: 18,
        fontFamily: "Comfortaa_400Regular",
        color: Colors.SurfaceContrast,
        marginTop: 12,
        marginBottom: 12,
    },
})