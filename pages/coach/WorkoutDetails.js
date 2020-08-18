import React, { useState }from 'react';
import { StatusBar, Text, SafeAreaView, StyleSheet, View } from 'react-native';
import WorkoutDetailsHeader from './WorkoutDetailHeader'
import WorkoutDetailsAssignments from './WorkoutDetailsAssignments'
import SolidButton from '../../components/SolidButton'
import Colors from '../../utilities/Colors';
import Calendar from '../../components/Calendar'
import { SelectExercise } from './CreateAssignmentForm'
import { OutlinedButton } from '../../components/Components';

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
    
    const [showCalendar, setShowCalendar] = useState(false);
    const [showExercises, setShowExercises] = useState(false);

    const toggleCalendar = () => setShowCalendar(!showCalendar);
    const toggleExercises = () => setShowExercises(!showExercises);

    return (
        showExercises ? <SelectExercise
            user={props.user}
            onCancel={toggleExercises}
            onSelect={(e) => {
                props.onAddAssignment({
                    exercise_id: e.id, 
                    rep_count: [0, 0, 0, 0, 0],
                    name: e.name,
                    weight_scheme: 'constant',
                });
                toggleExercises();
            }}
        />:
        <>
            <SafeAreaView style={styles.safeAreaTop} />
            <StatusBar barStyle="dark-content" />
            <WorkoutDetailsHeader
                options={props.options}
                onBack={props.onCancel}
                onFinish={props.onCreate}
                onToggleCalendar={toggleCalendar}
                onChangeName={props.onChangeName}
            />    
            <View style={{flex: 1, alignItems: 'flex-end', width: '100%'}}> 
                {(showCalendar && 
                <View style={{width: '100%', flex: 1, paddingBottom: 36, justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={{width: '100%',alignItems: 'center'}}>
                    <Text style={styles.body}>
                        Select the days that you want your athletes to complete the workout.
                    </Text>
                    <Calendar date={props.options.dates} onToggleDate={props.onToggleDate}/>
                    </View>
                    <SolidButton text={'Done'} onPress={toggleCalendar}/>
                </View>) ||
                    <>
                        <WorkoutDetailsAssignments assignments={props.assignments} /> 
                        <View style={{padding: 30, position: 'absolute', alignItems: 'flex-end', width: 250, right: 0, bottom: 0}}>
                            <SolidButton text={'Add Exercise'} onPress={toggleExercises}/> 
                        </View> 
                    </>       
                }   
                 
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    safeAreaTop: {
        flex: 0,
        backgroundColor: Colors.Surface
    },
    body: {
        fontSize: 18,
        fontFamily: 'Comfortaa_400Regular',
        padding: 24,
    },
})
