import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, TouchableOpacity, SafeAreaView, Text, View, TextInput, Animated, Button, Dimensions, ColorPropType, ScrollView} from 'react-native';
import Colors from '../utilities/Colors';
import { Card, ScrollWheel } from '../components/Components';
import Icon from 'react-native-vector-icons/Feather';
import SelectExercise from './SelectExercise'
import CreateAssignmentForm from './CreateAssignmentForm'
import DatePicker from '../components/DatePicker';
import { LinearGradient } from 'expo-linear-gradient';

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
                paddingHorizontal: 24,
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
                <DatePicker onChange={(date) =>props.onChange('date', date)}/>
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

 

function Assignment(props) {
    return (
        <View style={styles.borderedSection}>
            <View style={{flexDirection: 'row', padding: 8, justifyContent: 'space-between', alignItems: 'center'}}>
                <View>
                    <Text style={{fontSize: 18}}>{props.assignment.name}</Text>
                </View>
                <Icon size={30} color={Colors.Primary} name={'more-horizontal'}/>
            </View>
        </View>
    )
}

function Header(props) {
    return (
        <View style={styles.header}>
            <View style={{flexDirection: 'row', width: '100%', marginBottom: 16, alignItems: 'center', justifyContent: 'space-between'}}>
                <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={props.onBack}
                    style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: Colors.SurfaceContrast, paddingHorizontal: 4, paddingVertical: 4}}
                >
                    <Icon 
                        size={30}
                        color={Colors.SurfaceContrast}
                        name={'arrow-left'}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>Workout</Text>
                <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={props.onBack}
                    style={{borderColor: Colors.SurfaceContrast, paddingHorizontal: 4, paddingVertical: 4}}
                >
                     <Icon 
                        size={30}
                        color={Colors.SurfaceContrast}
                        name={'check'}
                    />
                </TouchableOpacity>
            </View>
            <View style={[styles.borderedSection, {flexDirection: 'row'}]}>
                <View style={{flexDirection: 'row'}}>
                    <Icon
                        onPress={props.onAddExercise}
                        size={18}
                        color={Colors.SurfaceContrast}
                        name={'clipboard'}
                    />
                    <Text style={[styles.subtitle, {marginLeft: 8}]}>{props.options.name}</Text>
                </View>
                <Icon
                    onPress={props.onAddExercise}
                    size={18}
                    color={Colors.SurfaceContrast}
                    name={'more-horizontal'}
                />
            </View>
            <View style={[styles.borderedSection, {flexDirection: 'row'}]}>
                <View  style={{flexDirection: 'row'}}>
                    <Icon
                        onPress={props.onAddExercise}
                        size={18}
                        color={Colors.SurfaceContrast}
                        name={'calendar'}
                    />
                    <Text style={[styles.subtitle, {marginLeft: 8}]}>{props.options.date}</Text>
                </View>
                <Icon
                    onPress={props.onAddExercise}
                    size={18}
                    color={Colors.SurfaceContrast}
                    name={'more-horizontal'}
                />
            </View>
            <View style={[styles.section, {flexDirection: 'row'}]}>
                <View  style={{flexDirection: 'row'}}>
                    <Icon
                        onPress={props.onAddExercise}
                        size={18}
                        color={Colors.SurfaceContrast}
                        name={'repeat'}
                    />
                    <Text style={[styles.subtitle, {marginLeft: 8}]}>{props.options.repeat}</Text>
                </View>
                <Icon
                    onPress={props.onAddExercise}
                    size={18}
                    color={Colors.SurfaceContrast}
                    name={'more-horizontal'}
                />
            </View>
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
                WorkoutDateForm,
                WorkoutRepeatForm,
            ]}
        />)
    case 2:
        return (
            <>
                <SafeAreaView style={styles.safeAreaTop} />
                <StatusBar barStyle="dark-content" />
                <View style={styles.container}>
                    <Header 
                        options={options}
                        onBack={() => setCreationState(1)}
                        onAddExercise={() => setCreationState(3)}
                    />
                    <ScrollView padding={10} style={{flex: 1, width: '100%'}}>
                    {
                        assignments.map((a, i) => {
                            return <Assignment key={i} assignment={a} />;
                        })
                    }
                    <View style={{height: 125}}></View>
                    </ScrollView >
                    <LinearGradient
                        colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.7)']}
                        locations={[0.1, 0.5]}
                        start={[0, 0]}
                        end={[0, 1]}
                        style={{
                            width: '100%',
                            height: 100,
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                            position: 'absolute',
                            bottom: 0,
                            right: 10}}
                >
                    <TouchableOpacity 
                        activeOpacity={0.8}
                        style={[styles.optionButton]}
                    >
                        <Icon
                            onPress={() => setCreationState(3)}
                            size={30}
                            color={Colors.PrimaryContrast}
                            name={'plus'}
                        />
                    </TouchableOpacity>
                    </LinearGradient>                   
                </View>
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