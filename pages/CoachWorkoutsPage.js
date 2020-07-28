import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import Colors from '../utilities/Colors';
import { Card } from '../components/Components'
import { getWorkoutsForTeam } from '../utilities/api'
import Icon from 'react-native-vector-icons/Feather';
import CoachWorkoutDetails from './CoachWorkoutDetails'

export default function CoachWorkoutsPage(props) {

    const [workouts, setWorkouts] = useState(null);
    
    useEffect(() => {
        if (workouts === null)
            getWorkoutsForTeam(props.user.team_id).then(data => setWorkouts(data) );
    });

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.title}>Workouts</Text>
                <Icon size={40} color={Colors.White} name={'plus'}/>
            </View>
            <ScrollView>
                {  (workouts === null && <Text style={styles.watermark}>Loading...</Text>)
                || (workouts.length == 0 && <Text style={styles.watermark}>No upcoming workouts</Text>)
                || (workouts.map((workout) =>
                        <Card barColor={Colors.Green} key={workout.id}>
                            <TouchableOpacity onPress={() => props.push(
                                <CoachWorkoutDetails 
                                    pop={() => props.pop()}
                                    push={(x) => props.push(x)}
                                    user={props.user}
                                    workout={workout}
                                />
                            )}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{justifyContent: 'space-around'}}>
                                    <Text style={{fontSize: 20}}>{workout.name}</Text>
                                    <Text>Repeat: {workout.repeat}</Text>
                                </View>
                                <Icon size={40} color={Colors.Green} name={'chevron-right'}/>
                            </View>
                            </TouchableOpacity>
                        </Card>
                ))}
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        padding: 15,
        paddingLeft: 20,
        paddingBottom: 20,
        backgroundColor: Colors.Green,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        fontSize: 32,
        color: Colors.White,
        fontFamily: 'Comfortaa_700Bold',
        textAlign: 'left',
    }
})