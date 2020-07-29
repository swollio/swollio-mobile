import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import Colors from '../utilities/Colors';
import { Card } from '../components/Components'
import { getWorkoutsForTeam } from '../utilities/api'
import Icon from 'react-native-vector-icons/Feather';
import CoachWorkoutDetails from './CoachWorkoutDetails'
import CreateWorkoutForm from './CreateWorkoutForm'

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
                <Icon onPress={() => props.push(<CreateWorkoutForm onCreate={(w) => {console.log(w); props.pop()}} onCancel={() => props.pop()}></CreateWorkoutForm>)} size={40} color={Colors.PrimaryContrast} name={'plus'}/>
            </View>
            <ScrollView padding={10}>
                {  (workouts === null && <Text style={styles.watermark}>Loading...</Text>)
                || (workouts.length == 0 && <Text style={styles.watermark}>No upcoming workouts</Text>)
                || (workouts.map((workout) =>
                        <Card barColor={Colors.Primary} key={workout.id}>
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
                                    <Text style={{color: Colors.SurfaceContrast, fontSize: 20}}>{workout.name}</Text>
                                    <Text style={{color: Colors.SurfaceContrast}}>Repeat: {workout.repeat}</Text>
                                </View>
                                <Icon size={40} color={Colors.Primary} name={'chevron-right'}/>
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
        backgroundColor: Colors.Primary,
        borderColor: Colors.BackgroundContrast,
        borderBottomWidth: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

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