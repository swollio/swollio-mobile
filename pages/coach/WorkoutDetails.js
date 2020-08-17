import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet, View } from 'react-native';
import WorkoutDetailsHeader from './WorkoutDetailHeader'
import WorkoutDetailsAssignments from './WorkoutDetailsAssignments'
import SolidButton from '../../components/SolidButton'
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
export default function WorkoutDetails(props) {
    
    return (
        <>
            <SafeAreaView style={styles.safeAreaTop} />
            <StatusBar barStyle="dark-content" />
            <View style={{flex: 1, alignItems: 'flex-end', width: '100%'}}>
                <WorkoutDetailsHeader
                    options={props.options}
                    onBack={props.onCancel}
                    onFinish={props.onCreate}
                    onToggleDate={props.onToggleDate}
                    onChangeName={props.onChangeName}
                />        
                <WorkoutDetailsAssignments assignments={props.assignments} />        
                <View style={{padding: 30, position: 'absolute', alignItems: 'flex-end', width: 250, right: 0, bottom: 0}}>
                    <SolidButton text={'Add Exercise'} onPress={props.onAddExercises}/> 
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
