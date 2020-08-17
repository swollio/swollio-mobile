import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, TouchableOpacity, SafeAreaView, Text, View, TextInput, Animated, Button, Dimensions, ColorPropType, ScrollView} from 'react-native';
import Colors from '../../utilities/Colors';
import Icon from 'react-native-vector-icons/Feather';
import SolidButton from '../../components/SolidButton'

import CreateAssignmentForm from './CreateAssignmentForm'
import DatePicker from '../../components/DatePicker';

import { CreateSingleStringForm } from '../../components/Components';
import FormContainer from '../../containers/FormContainer'
import WorkoutDetails from './WorkoutDetails'
import { getAssignmentsForTeamWorkout } from '../../utilities/api'
import moment from 'moment'
export const WorkoutNameForm = CreateSingleStringForm({
    title: 'Choose Name.',
    subtitle: 'Enter the workout name.',
    keyboardType: 'default',
    validator: (value) => value !== '',
    field: 'name',
    dismissKeyboard: true
});
function WorkoutDateForm(props) {
    return (
            <View style={styles.form}>
                <Text style={[styles.formTitle, {marginBottom: 16}]}>{props.title}</Text>
                <DatePicker onChange={(date) => {
                    props.onChange(props.field, date)}
                }/>
                <View style={{height: 16}} />
                <SolidButton 
                    width={200}
                    text={'Continue'}
                    onPress={() => props.onCompleted()}
                />
            </View>
        );
}

function WorkoutRepeatForm(props) {
    
    const [repeatDays, setRepeatDays] = useState({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
    });

    const days = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday"
    ];

    return (
            <View style={styles.form}>
                <Text style={[styles.formTitle, {marginBottom: 32}]}>Which days should this workout be assigned on?</Text>
                {days.map(x => {
                    return (
                        <TouchableOpacity
                            key={x}
                            activeOpacity={0.8} 
                            style={{padding: 16, flexDirection: 'row', alignItems: 'center', width: '90%', borderBottomColor: '#DDD', borderBottomWidth: 1}}
                            onPress={() => {
                                repeatDays[x] = !repeatDays[x]
                                setRepeatDays({...repeatDays})
                            }}
                        >
                            <Icon 
                                name={'check'}
                                size={20}
                                style={{marginRight: 16, color: repeatDays[x] ? Colors.Primary: '#EEE'}}
                                onPress={props.onBack}
                            />
                            <Text>{x}</Text>
                        </TouchableOpacity>
                    )
                })}
                <View style={{height: 20}} />
                <SolidButton 
                    width={200}
                    text={'Continue'}
                    onPress={() => {
                        props.onChange('repeat', days.filter(d => repeatDays[d]).map(d => days.indexOf(d)))
                        props.onCompleted()
                    }}
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
                text={"Continue"}
                onPress={props.onCompleted}
            />
        </View>
    );
}

export default function CreateWorkoutForm(props) {

    const [options, setOptions] = useState(props.options || {
        name: '',
        dates: new Set(),
    });

    const toggleDate = (date) => {
        if (options.dates.has(date)) {
            options.dates.delete(date);
        } else {
            options.dates.add(date);
        }
        setOptions({...options})
    }

    const changeName = (name) => {
        options.name = name.trim();
        setOptions({...options})
    }

    const [assignments, setAssignments] = useState(props.assignments);
    const [creationState, setCreationState] = useState(0)
    
    if (options === null) {
        return (
            <FormContainer
                onCancel={() => props.onCancel()}
                onCompleted={(options) => setOptions(options) }
                forms={[
                    WorkoutNameForm,
                    (props) => <
                        WorkoutDateForm {...props}
                        field="dates"
                        title="Select start date."
                    />,
                    WorkoutRepeatForm,
                    (props) => <
                        WorkoutDateForm {...props}
                        field="end_date"
                        title="Select end date."
                    />,
                    WorkoutCreatedForm,
                ]}
            />
        );
    } else if (creationState === 0) {
        return (<WorkoutDetails 
            options={options}
            assignments={assignments}
            onCreate={() => props.onCreate({
                name: options.name === '' ? 'Untitled Workout': options.name,
                dates: [...options.dates],
                assignments
            })}
            onCancel={() => props.onCancel()}
            onToggleDate={(date) => toggleDate(date.format('YYYY-MM-DD'))}
            onAddExercises={() => setCreationState(1)}
            onChangeName={(name) => changeName(name)}
        />)
    } else {
        return (<CreateAssignmentForm
            user={props.user}
            onCancel={() => setCreationState(0)}
            onCreate={(assignment) => {
                setAssignments([...assignments, assignment])
                setCreationState(0);
            }}
        />);
    }
}



const styles = StyleSheet.create({
    form: {
        alignItems: 'center',
        alignContent: 'center',
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