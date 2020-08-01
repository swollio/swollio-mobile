import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet, View } from 'react-native';
import WorkoutDetailsHeader from './WorkoutDetailsHeader'
import WorkoutDetailsAssignments from './WorkoutDetailsAssignments'
import CircularButton from '../../components/CircularButton'
import Colors from '../../utilities/Colors';

/**
 * WorkoutsDetails is full page component for displaying workout details.
 * It displays navigation icons ('back' and 'finish') as well as information
 * about a workout, and a list of all exercises assignments that are part
 * of the workout. Finally, it displays a button that allows coaches to add
 * exercises to a workout.
 * 
 * PropType:
 * - onBack: () => () 
 * - onFinish: () => ()
 * - onAddExercise: () => ()
 * - options: { created: string, repeat: string }
 * - assignments: { 
 *      exercise_id: number,
 *      exercise_name: string,
 *      rep_count: number[],
 *      weight_scheme: string
 *   }[]
 */
export default function WorkoutsDetails(props) {
    
    return (
        <>
            <SafeAreaView style={styles.safeAreaTop} />
            <StatusBar barStyle="dark-content" />
            <View style={{flex: 1, alignItems: 'flex-end'}}>
                <WorkoutDetailsHeader
                    options={props.options}
                    onBack={props.onCancel}
                    onFinish={props.onCreate}
                />        
                <WorkoutDetailsAssignments assignments={props.assignments} />        
                <View style={{padding: 16, position: 'absolute', right: 0, bottom: 0}}>
                    <CircularButton icon={'plus'} onPress={props.onAddExercises}/> 
                </View>    
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    safeAreaTop: {
        flex: 0,
        backgroundColor: Colors.Surface
    },
})
