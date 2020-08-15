import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Colors from '../../utilities/Colors';
import LogoOutline from '../LoadingPage'
import LoadingPage from '../LoadingPage';
import { getTodaysWorkoutsForAthlete } from '../../utilities/api'
import { Card, WorkoutCover, AbCard, AbSetup } from '../../components/Components'
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
            <ScrollView 
                style={{ padding: 10, flex: 1}}
                showsVerticalScrollIndicator={false}
            >
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
                <AbCard exercises={[
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
                    "Bicycle Kicks",
                    'Low Plank',
                    "Flutter Kicks",
                    "Situps",
                    "V Sit",
                    "Leg Lifts",
                    "V Ups",
                ]}/>
            </ScrollView>
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