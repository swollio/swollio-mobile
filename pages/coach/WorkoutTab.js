import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import Colors from '../../utilities/Colors';
import { Card, OutlinedButton } from '../../components/Components'
import { getWorkoutsForTeam } from '../../utilities/api'
import Icon from 'react-native-vector-icons/Feather';
import CreateWorkoutForm from './CreateWorkoutForm'
import { postWorkoutForTeam, getAssignmentsForTeamWorkout } from '../../utilities/api'
import WorkoutDetailsItem from './WorkoutDetailsItem'
import moment from 'moment'
const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];


export default function WorkoutsPage(props) {

    const [workouts, setWorkouts] = useState(null);
    
    useEffect(() => {
        if (workouts === null)
            getWorkoutsForTeam(props.user.team_id).then(data => setWorkouts(data) );
    });

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.title}>Workouts</Text>
                <Icon onPress={() => props.push(() =>
                    <CreateWorkoutForm {...props}
                        onCreate={(w) => {
                            postWorkoutForTeam(props.user.team_id, w).then(() => {
                                props.pop()
                            }).catch(() => {
                                props.pop()
                            })
                        }}
                        assignments={[]}
                        onCancel={() => props.pop()}
                        options={null}
                    />
 
                    )}
                    size={40} color={Colors.PrimaryContrast} name={'plus'}/>
            </View>
            <ScrollView padding={10}>
                {  (workouts === null && <Text style={styles.watermark}>Loading...</Text>)
                || (workouts.length == 0 && <Text style={styles.watermark}>No upcoming workouts</Text>)
                || (workouts.map((workout) =>
                        <Card barColor={Colors.Primary} key={workout.id}>
                            <View style={{flex: 1, justifyContent: 'space-around'}}>
                                <Text style={styles.workoutTitle}>{workout.name}</Text>
                                <WorkoutDetailsItem icon={'calendar'} value={
                                    moment(workout.start_date).format('MM/DD/YYYY') + 
                                    " - " +
                                    moment(workout.end_date).format('MM/DD/YYYY')
                                }/>
                                <WorkoutDetailsItem icon={'repeat'} value={workout.repeat.map(i => days[i]).join(", ")}/>
                            </View>
                            <View style={{alignItems: 'center', padding: 16}}>
                            <OutlinedButton 
                                onPress={() => {
                                    getAssignmentsForTeamWorkout(props.user.team_id, workout.id)
                                    .then(assignments => {
                                        props.push(() =>
                                        <CreateWorkoutForm
                                            push={props.push}
                                            pop={props.pop}
                                            onCreate={(w) => props.pop() }
                                            onCancel={ () => props.pop() }
                                            options={workout}
                                            assignments={assignments}
                                        />
                                    ).catch(err => {
                                        console.log(err);
                                    })
                                    })
                                }}
                                text={"Edit"}
                            />
                            </View>
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
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
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
    },
    workoutTitle: {
        fontSize: 26,
        color: Colors.BackgroundContrast,
        fontFamily: 'Comfortaa_700Bold',
        textAlign: 'left',
        marginVertical: 8,
    }
})