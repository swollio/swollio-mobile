import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Colors from '../../utilities/Colors';
import { Card, OutlinedButton } from '../../components/Components'
import { getWorkoutsForTeam } from '../../utilities/api'
import CreateWorkoutForm from './CreateWorkoutForm'
import { postWorkoutForTeam, getAssignmentsForTeamWorkout } from '../../utilities/api'
import WorkoutDetailsItem from './WorkoutDetailsItem'
import moment from 'moment'
import WaterMark from '../../components/WaterMark'
import headerStyles from '../styles/Header'
import SolidButton from '../../components/SolidButton'

const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];

/**
 * Header is the header component for the Coach WorkoutTab page.
 * It is a pretty basic header, only containing a title and a plus button
 * to create a new workout.
 * 
 * @param push - push element onto stack container
 * @param pop - pop element from stack container
 */
function Header(props) {
    return (
        <View style={[
            headerStyles.container,
            headerStyles.header,
            {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }
        ]}>
            <Text style={headerStyles.title}>Workouts</Text>
        </View>
    );
}


export default function WorkoutsPage(props) {

    const [workouts, setWorkouts] = useState(null);
    
    useEffect(() => {
        if (workouts === null)
            getWorkoutsForTeam(props.user.team_id).then(data => setWorkouts(data) );
    });


    return (
        <>
            <Header {...props} />
                {  (workouts === null && <WaterMark title={'Loading...'}/>)
                || (workouts.length == 0 && <WaterMark title={'No Upcoming Workouts'}>
                         <Text style={{fontSize: 16, textAlign: 'center', padding: 24, color: Colors.SurfaceContrast2}}>Any workouts that you create will automatically get assigned to your athletes. You can check in later and monitor their progress.</Text>
                </WaterMark>)
                || 
                    <ScrollView padding={10}>
                        {
                            workouts.map((workout) => (
                                <Card barColor={Colors.Primary} key={workout.id}>
                                    <View style={{flex: 1, justifyContent: 'space-around'}}>
                                        <Text style={styles.workoutTitle}>{workout.name}</Text>
                                        <WorkoutDetailsItem icon={'history'} value={workout.dates.length + ' upcoming workouts'}/>
                                    </View>
                                </Card>
                            ))
                        }
                </ScrollView>   
                            }
                <View style={{padding: 30, position: 'absolute', alignItems: 'flex-end', width: 250, right: 0, bottom: 0}}>
                    <SolidButton
                            text="Create"
                            style={{width: 130, height: 45}}
                            onPress={() => props.push(() =>
                                <CreateWorkoutForm {...props}
                                    onCreate={(w) => {
                                        console.log(w);
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
                        />
                </View>  

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