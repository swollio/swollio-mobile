import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Colors from '../utilities/Colors';
import { Card } from './Components'
import { getWorkoutsForAthlete } from '../utilities/api'

export default function WorkoutsPage(props) {

    const [workouts, setWorkouts] = useState(null);
    
    useEffect(() => {
        if (workouts == null) {
            getWorkoutsForAthlete(props.user.athlete_id).then(data => {
                console.log(data);
                setWorkouts(data)
            });
        }
    });

    
    return (
        <>
            <View style={styles.header}>
                <Text style={styles.title}>Workouts</Text>
            </View>
            <ScrollView>
                {  (workouts == null && <Text style={styles.watermark}>Loading...</Text>)
                || (workouts.length == 0 && <Text style={styles.watermark}>no upcoming workouts</Text>)
                || (workouts.map((workout) =>
                        <Card key={workout.id}>
                            <Text style={styles.title}>{workout.workout_name}</Text>
                            <Text>Team: {workout.team_name}</Text>
                            <Text>Repeat: {workout.repeat}</Text>
                        </Card>
                ))}
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        padding: 20,
        backgroundColor: Colors.Green,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    watermark: {
        textAlign: 'center',
        fontSize: 24,
        color: Colors.Grey,
        margin: 50,
    },
    title: {
        fontSize: 28,
        color: Colors.Black,
        fontFamily: 'Comfortaa_400Regular',
        textAlign: 'left',
    }
})