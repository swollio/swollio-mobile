import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, Button } from 'react-native';
import Colors from './Colors';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export function FirstNameForm(props) {
    return (
        <View style={styles.form}>
            <Text style={styles.title}>What is your first name?</Text>
            <TextInput 
                style={styles.textInput} 
                onChangeText={props.onChange}
                placeholder='Jim' />
            <Text style={styles.subtitle}>Enter your first name</Text>
            <KeyboardSpacer/>
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
            <KeyboardSpacer/>
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
            <KeyboardSpacer/>
        </View>
    );
}

export function GenderForm(props) {
    return (
        <View style={styles.form}>
            <Text style={styles.title}>What is your gender?</Text>
            <TouchableOpacity style={styles.optionButton} >
                <Text style={{color: Colors.White}}>
                    Male
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}>
                <Text style={{color: Colors.White}}>
                    Female
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
    }
});