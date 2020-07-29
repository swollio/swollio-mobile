import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, TouchableOpacity, SafeAreaView, Text, View, TextInput, Animated, Button, Dimensions, ColorPropType, ScrollView} from 'react-native';
import Colors from '../utilities/Colors';
import { Card, ScrollWheel } from '../components/Components';
import Icon from 'react-native-vector-icons/Feather';
import SelectExercise from './SelectExercise'
import CreateAssignmentForm from './CreateAssignmentForm'

import { CreateSingleStringForm } from '../components/Components';
import FormContainer from '../containers/FormContainer'
import CoachWorkoutsDetails from './CoachWorkoutDetails'
export const WorkoutNameForm = CreateSingleStringForm({
    title: 'Name Your Workout.',
    subtitle: 'Enter the workout name.',
    keyboardType: 'default',
    validator: (value) => value !== '',
    field: 'name'
});
 
export const WorkoutDateForm = CreateSingleStringForm({
    title: 'What is the workout date?',
    subtitle: 'Enter the workout date.',
    keyboardType: 'default',
    validator: (value) => value !== '',
    field: 'date'
});
 
export const WorkoutRepeatForm = CreateSingleStringForm({
    title: 'Should the workout repeat?',
    subtitle: 'Enter the workout repeat.',
    keyboardType: 'default',
    validator: (value) => value !== '',
    field: 'date'
});
 
export const WorkoutTagsForm = CreateSingleStringForm({
    title: 'Select workout groups?',
    subtitle: 'Enter the workout group.',
    keyboardType: 'default',
    validator: (value) => value !== '',
    field: 'date'
});
 
function Assignment(props) {
    return (
        <Card barColor={Colors.Primary}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View>
                    <Text style={{fontSize: 18}}>{props.assignment.name}</Text>
                </View>
                <Icon size={40} color={Colors.Primary} name={'chevron-right'}/>
            </View>
        </Card>
    )
}

function Header(props) {
    return (
        <View style={styles.header}>
            <Icon 
                onPress={props.onBack}
                size={40}
                color={Colors.PrimaryContrast}
                name={'arrow-left'}
            />
            <Text style={styles.title}>Exercises</Text>
            <Icon
                onPress={props.onAddExercise}
                size={40}
                color={Colors.PrimaryContrast}
                name={'plus'}
            />
        </View>
    );
}
export default function CreateWorkoutForm(props) {
    const [options, setOptions] = useState(null);
    const [assignments, setAssignments] = useState([]);
    const [creationState, setCreationState] = useState(1)
    switch (creationState) {
    case 1: 
        return (
        <FormContainer
            onCancel={() => props.onCancel()}
            onCompleted={(options) => { setOptions(options); setCreationState(2) }}
            forms={[
                WorkoutNameForm,
                WorkoutDateForm,
                WorkoutRepeatForm,
                WorkoutTagsForm,
            ]}
        />)
    case 2:
        return (
            <>
            <SafeAreaView style={styles.safeAreaTop} />
            <SafeAreaView style={styles.safeAreaBottom}>
                <StatusBar barStyle="light-content" />
                <View style={styles.container}>
                    <Header 
                        onBack={() => setCreationState(1)}
                        onAddExercise={() => setCreationState(3)}
                    />
                    <ScrollView padding={10} style={{flex: 1, width: '100%'}}>
                    {
                        assignments.map((a, i) => {
                            return (<Assignment key={i} assignment={a} />);
                        })
                    }
                    </ScrollView>
                    <TouchableOpacity 
                        activeOpacity={0.8}
                        style={styles.optionButton}
                        onPress={() => props.onCreate({
                            ...options,
                            assignments
                        })}>
                            <Text style={{color: Colors.PrimaryContrast}}>Create Workout</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            </>
        )
    case 3:
        return <CreateAssignmentForm
            onCancel={() => setCreationState(2)}
            onCreate={(assignment) => {
                setAssignments([...assignments, assignment])
                setCreationState(2);
            }}
        />
    }
}



const styles = StyleSheet.create({
    safeAreaTop: {
        flex: 0,
        backgroundColor: Colors.Primary
    },
    safeAreaBottom: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
    container: {
        height: '100%',
        alignItems: 'center',
        backgroundColor: Colors.backgroundColor
    },
    optionButton: {
        backgroundColor: Colors.Primary,
        width: 350,
        maxWidth: '80%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 25,
        shadowColor: Colors.BackgroundContrast,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 15,
        marginBottom: 10
    },
    header: {
        width: '100%',
        padding: 15,
        borderColor: Colors.BackgroundContrast,
        borderBottomWidth: 3,
        backgroundColor: Colors.Primary,
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
        fontSize: 30,
        color: Colors.PrimaryContrast,
        fontFamily: 'Comfortaa_700Bold',
        textAlign: 'center',
    },
    textInput: {
        width: '100%',
        backgroundColor: Colors.Background,
        paddingHorizontal: 18,
        color: Colors.BackgroundContrast,
        fontSize: 24,
        paddingVertical: 8,
        borderColor: Colors.SurfaceContrast2,
        borderWidth: 1,
        borderRadius: 10,
        textAlign: 'left'
    },
})