import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../utilities/Colors';
import LogoOutline from '../LoadingPage'
import LoadingPage from '../LoadingPage';
import AbCard from '../../components/Cards/AbCard'
import { getTodaysWorkoutsForAthlete } from '../../utilities/api'
import { Card, WorkoutCover } from '../../components/Components'
import WorkoutProgress from './WorkoutPage'

export default function UserTab(props) {

    const [todaysWorkouts, setTodaysWorkouts] = useState(null);

    useEffect(() => {
        if (todaysWorkouts === null) {
            getTodaysWorkoutsForAthlete(props.user.athlete_id).then( data => setTodaysWorkouts(data) );
        }
        return () => {} 
    });

    return (
        <View style={{flex: 1}}>
            <View style={styles.header}>
                <Text style={styles.title}>Hello, {props.user.first_name}!</Text>
            </View>
            <View style={{margin: 10, flex: 1}}>
                <Text style={styles.sectionLabel}>Today</Text>
                {
                    (todaysWorkouts || []).map((workout, index) => {
                        return (
                        <WorkoutCover 
                            key={index} 
                            color={Colors.Primary} 
                            completed={workout.completed}
                            title={workout.workout_name} 
                            team_name={workout.team_name}
                            created={workout.created}
                            onStartWorkout={() => props.push(() => 
                            <WorkoutProgress 
                                pop={props.pop}
                                push={props.push}
                                workout={workout}
                                user={props.user}
                            />)}
                        />)
                    })
                }
                <Text style={styles.sectionLabel}>Featured</Text>
                <AbCard exercises={[]}/>
            </View>
        </View>
    );
}

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
    title: {
        fontSize: 32,
        color: Colors.PrimaryContrast,
        fontFamily: 'Comfortaa_700Bold',
        textAlign: 'left',
    }
})