import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, TouchableOpacity, SafeAreaView, Text, View, TextInput, Animated, Button, Dimensions, ColorPropType, ScrollView} from 'react-native';
import Colors from '../utilities/Colors';
import { getWorkoutForTeam } from '../utilities/api'
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import SelectExercise from './SelectExercise'

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
                    onPress={props.onFinish}
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

export default function CoachWorkoutsDetails(props) {
    
    return (
        <>
            <SafeAreaView style={styles.safeAreaTop} />
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>
                <Header 
                    options={props.options}
                    onBack={() => props.onCancel()}
                    onFinish={() => props.onCreate({...props.options, assignments: props.assignments})}
                />
                <ScrollView padding={10} style={{flex: 1, width: '100%'}}>
                {
                    props.assignments.map((a, i) => {
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
                        onPress={props.onAddExercises}
                        size={30}
                        color={Colors.PrimaryContrast}
                        name={'plus'}
                    />
                </TouchableOpacity>
                </LinearGradient>                   
            </View>
        </>
    )
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