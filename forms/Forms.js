import React, { Component, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, Button, Dimensions} from 'react-native';
import Colors from './Colors';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';

export function FirstNameForm(props) {
    
    return (
        <View style={styles.form}>
            <Text style={styles.title}>What is your first name?</Text>
            <TextInput 
                style={styles.textInput} 
                onChangeText={props.onChange}
                placeholder='Jim' />
            <Text style={styles.subtitle}>Enter your first name</Text>
            <TouchableOpacity activeOpacity={0.8} style={styles.optionButton} onPress={() => props.onCompleted()}>
                    <Text style={{color: Colors.White}}>Continue</Text>
            </TouchableOpacity>
            <KeyboardSpacer />
        </View>
    );
}

export function LastNameForm(props) {
    return (
        <View style={styles.form}>
            <Text style={styles.title}>What is your last name?</Text>
            <TextInput 
                style={styles.textInput} 
                onChangeText={props.onChange}
                placeholder='Wood' />
            <Text style={styles.subtitle}>Enter your last name</Text>
            <TouchableOpacity activeOpacity={0.8} style={styles.optionButton} onPress={() => props.onCompleted()}>
                <Text style={{color: Colors.White}}>Continue</Text>
            </TouchableOpacity>
            <KeyboardSpacer />
        </View>
    );
}

export function AgeForm(props) {
    return (
        <View style={styles.form}>
            <Text style={styles.title}>How old are you?</Text>
            <TextInput 
                style={styles.textInput} 
                onChangeText={props.onChange} 
                keyboardType={'numeric'} 
                returnKeyType={'done'} // Color is off here
                placeholder='69' />
            <Text style={styles.subtitle}>Enter your age.</Text>
            <TouchableOpacity activeOpacity={0.8} style={styles.optionButton} onPress={() => props.onCompleted()}>
                <Text style={{color: Colors.White}}>Continue</Text>
            </TouchableOpacity>
            <KeyboardSpacer/>
        </View>
    );
}


export function EmailForm(props) {
    return (
        <View style={styles.form}>
            <Text style={styles.title}>What is your email?</Text>
            <TextInput 
                style={styles.textInput} 
                onChangeText={props.onChange} 
                keyboardType = {'email-address'} // Maybe take this away?
                placeholder='jimwood@email.com' />
            <Text style={styles.subtitle}>Enter your email address.</Text>
            <TouchableOpacity activeOpacity={0.8} style={styles.optionButton} onPress={() => props.onCompleted()}>
                <Text style={{color: Colors.White}}>Continue</Text>
            </TouchableOpacity>
            <KeyboardSpacer/>
        </View>
    );
}

export function GenderForm(props) {
    return (
        <View style={styles.form}>
            <Text style={styles.title}>What is your gender?</Text>
            <TouchableOpacity style={styles.optionButton} onPress={() => props.onCompleted()}>
                <Text style={{color: Colors.White}}>
                    Male
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => props.onCompleted()}>
                <Text style={{color: Colors.White}}>
                    Female
                </Text>
            </TouchableOpacity>
        </View>
    );
}

function ButtonRow() {
    
    const [states, setStates] = React.useState([false, false, false]);

    function stateController(index) {
        // Turning a different toggle on
        if (states[index])
            return;
        
        const newStates = [false, false, false];
        newStates[index] = true;

        setStates(newStates);
    }

    return (
        <View style={styles.buttonRow}>
            <TouchableOpacity 
                style={[
                    styles.toggleButton, !states[0] ?
                    {
                        backgroundColor: Colors.White,
                        borderColor: Colors.Red
                    } : 
                    {
                        backgroundColor: Colors.Red,
                        borderColor: Colors.White
                    }    
                ]}
                onPress={() => stateController(0)}>
                <Text style={[
                        styles.buttonText, !states[0] ? 
                        {color: Colors.Red} : 
                        {color: Colors.White}]
                    }>
                    4'
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[
                    styles.toggleButton, !states[1] ?
                    {
                        backgroundColor: Colors.White,
                        borderColor: Colors.Red
                    } : 
                    {
                        backgroundColor: Colors.Red,
                        borderColor: Colors.White
                    }    
                ]}
                onPress={() => stateController(1)}>
                <Text 
                    style={[
                        styles.buttonText, !states[1] ? 
                        {color: Colors.Red} : 
                        {color: Colors.White}]
                    }>
                    5'
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[
                    styles.toggleButton, !states[2] ?
                    {
                        backgroundColor: Colors.White,
                        borderColor: Colors.Red
                    } : 
                    {
                        backgroundColor: Colors.Red,
                        borderColor: Colors.White
                    }    
                ]}
                onPress={() => stateController(2)}>
                <Text style={[
                        styles.buttonText, !states[2] ? 
                        {color: Colors.Red} : 
                        {color: Colors.White}]
                    }>
                    6'
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export function HeightForm(props) {
    return (
        <View style={styles.form}>
            <Text style={[styles.title, {padding: 10}]}>What is your height?</Text>
            <ButtonRow />
            <TouchableOpacity activeOpacity={0.8} style={styles.optionButton} onPress={() => props.onCompleted()}>
                <Text style={{color: Colors.White}}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}

export function GymAccessForm(props) {
    return (
        <View style={styles.form}>
            <Text style={styles.title}>Do you have gym access?</Text>
            <TouchableOpacity style={styles.optionButton} onPress={() => props.onCompleted()}>
                <Text style={{color: Colors.White}}>
                    Yes
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => props.onCompleted()}>
                <Text style={{color: Colors.White}}>
                    No
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export function WorkoutEquipmentForm(props) {
    return (
        <View style={styles.form}>
            <Text style={styles.title}>Do you have workout equipment?</Text>
            <TouchableOpacity style={styles.optionButton} onPress={() => props.onCompleted()}>
                <Text style={{color: Colors.White}}>
                    Yes
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => props.onCompleted()}>
                <Text style={{color: Colors.White}}>
                    No
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        textAlign: 'center',
        maxWidth: '80%',
    },
    subtitle: {
        textAlign: 'center',
        maxWidth: '80%',
        marginBottom: 50,
    },
    textInput: {
        width: 350,
        backgroundColor: Colors.LightGrey,
        paddingHorizontal: 24,
        fontSize: 16,
        paddingVertical: 16,
        borderRadius: 10,
        marginTop: 25,
        marginBottom: 10,
        maxWidth: '80%',
        textAlign: 'center'
    },
    form: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    optionButton: {
        backgroundColor: Colors.Red,
        width: 350,
        maxWidth: '80%',
        height: 50,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 25,
        shadowColor: Colors.Black,
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
    buttonRow: {
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    toggleButton: {
        padding: 10,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderWidth: 1,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 30,
        marginBottom: 50,
    },
    buttonText: {
        fontSize: 26,
    },

});