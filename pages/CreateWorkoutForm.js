import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, TouchableOpacity, SafeAreaView, Text, View, TextInput, Animated, Button, Dimensions, ColorPropType, ScrollView} from 'react-native';
import Colors from '../utilities/Colors';

import CreateAssignmentForm from './CreateAssignmentForm'
import DatePicker from '../components/DatePicker';

import { CreateSingleStringForm } from '../components/Components';
import FormContainer from '../containers/FormContainer'
import CoachWorkoutsDetails from './CoachWorkoutDetails'
export const WorkoutNameForm = CreateSingleStringForm({
    title: 'Choose Name.',
    subtitle: 'Enter the workout name.',
    keyboardType: 'default',
    validator: (value) => value !== '',
    field: 'name'
});

function OutlinedButton(props) {
    return (
        <TouchableOpacity 
            activeOpacity={0.8}
            style={{
                paddingHorizontal: 24,
                height: 50,
                width: props.width || 'auto',
                alignItems: 'center',
                margin: 5,
                justifyContent: 'center',
                borderColor: Colors.Primary,
                borderWidth: 1,
                borderRadius: 25
            }}
            onPress={props.onPress}
        >
            <Text style={{fontSize: 16, color: Colors.Primary}}>{props.text}</Text>
        </TouchableOpacity>
    )
}

function SolidButton(props) {
    return (
        <TouchableOpacity 
            activeOpacity={0.8}
            style={[{
                paddingHorizontal: 36,
                width: props.width || 'auto',
                backgroundColor: Colors.Primary,
                height: 50,
                alignItems: 'center',
                margin: 5,
                justifyContent: 'center',
                borderRadius: 25
            }, !props.enabled ? {
                backgroundColor: Colors.Background,
            }: {}]}
            onPress={() => props.enabled && props.onPress()}
        >
            <Text style={{fontSize: 16, color: Colors.PrimaryContrast}}>{props.text}</Text>
        </TouchableOpacity>
    )
}
function WorkoutDateForm(props) {
    return (
            <View style={styles.form}>
                <Text style={[styles.formTitle, {marginBottom: 8}]}>What day is your workout?</Text>
                <DatePicker onChange={(date) => props.onChange('created', date)}/>
                <SolidButton 
                    width={200}
                    text={'Continue'}
                    enabled={true}
                    onPress={() => props.onCompleted()}
                />
            </View>
        );
}

function WorkoutRepeatForm(props) {
    return (
            <View style={styles.form}>
                <Text style={[styles.formTitle, {marginBottom: 32}]}>How often should the workout repeat.</Text>
                <OutlinedButton 
                    onPress={() => {
                        props.onChange('repeat', 'none')
                        props.onCompleted()
                    }}
                    width={200}
                    text={'None'}
                />
                <OutlinedButton 
                    onPress={() => {
                        props.onChange('repeat', 'weekly')
                        props.onCompleted()
                    }}
                    width={200}
                    text={'Weekly'}
                />
                <OutlinedButton 
                    onPress={() => {
                        props.onChange('repeat', 'daily')
                        props.onCompleted()
                    }}
                    width={200}
                    text={'Daily'}
                />
            </View>
        );
}

 
export function WorkoutCreatedForm(props) {
    
    return (
        <View style={styles.form}>
            <Text style={[styles.title, {marginBottom: 20}]}>Your workout has been created.</Text>
            <Text style={styles.subtitle}>You can now add exercises to the workout</Text>
            <SolidButton
                enabled={true}
                text={"Continue"}
                onPress={props.onCompleted}
            />
        </View>
    );
}

export default function CreateWorkoutForm(props) {
    const [options, setOptions] = useState(props.options);
    const [assignments, setAssignments] = useState([]);
    const [creationState, setCreationState] = useState(0)
    
    useEffect(() => {
        if (data === null) 
            getAthletesForTeam(props.user.team_id).then(data => setData(data));
    });

    if (options === null) {
        return (
            <FormContainer
                onCancel={() => props.onCancel()}
                onCompleted={(options) => { setOptions(options); }}
                forms={[
                    WorkoutDateForm,
                    WorkoutRepeatForm,
                    WorkoutCreatedForm
                ]}
            />
        );
    } else {
        return creationState == 0 ?
        <CoachWorkoutsDetails 
            options={options}
            assignments={assignments}
            onCreate={() => props.onCreate({...options, assignments})}
            onCancel={() => props.onCancel()}
            onAddExercises={() => setCreationState(1)}>
        </CoachWorkoutsDetails> :
        <CreateAssignmentForm
            onCancel={() => setCreationState(0)}
            onCreate={(assignment) => {
                setAssignments([...assignments, assignment])
                setCreationState(0);
            }}
        />
    }
}



const styles = StyleSheet.create({
    form: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    formTitle: {
        fontSize: 30,
        textAlign: 'center',
        maxWidth: '80%',
        fontFamily: 'Comfortaa_300Light'
    },
    safeAreaTop: {
        flex: 0,
        backgroundColor: Colors.Surface
    },
    safeAreaBottom: {
        flex: 1,
        backgroundColor: Colors.Surface,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.Surface,
        alignItems: 'flex-end'
    },
    optionButton: {
        width: 60,
        height: 60,
        margin: 30,
        backgroundColor: Colors.Primary,
        maxWidth: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        shadowColor: Colors.BackgroundContrast,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    header: {
        width: '100%',
        padding: 15,
        borderColor: Colors.Primary,
        borderBottomWidth: 2,
        backgroundColor: Colors.Surface,
        alignItems: 'center',
    },
    watermark: {
        textAlign: 'center',
        fontSize: 24,
        color: Colors.SurfaceContrast2,
        margin: 50,
    },
    title: {
        fontSize: 30,
        color: Colors.SurfaceContrast,
        fontFamily: 'Comfortaa_700Bold',
        textAlign: 'left',
    },
    subtitle: {
        fontSize: 18,
        color: Colors.SurfaceContrast,
        fontFamily: 'Comfortaa_700Bold',
        textAlign: 'left',
    },
    borderedSection: {
        padding: 8,
        width: '100%',
        borderColor: '#EEEEEE',
        borderBottomWidth: 1,
        justifyContent: 'space-between'
    },
    section: {
        padding: 8,
        width: '100%',
        backgroundColor: Colors.Surface,
        justifyContent: 'space-between'
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