import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, Button } from 'react-native';
import Colors from './Colors';

export function NameForm(props) {
    return (
        <View style={styles.form}>
            <Text style={styles.title}>What is your first name?</Text>
            <TextInput style={styles.textInput} onChangeText={props.onChange}></TextInput>
            <Text style={styles.subtitle}>Enter your first name</Text>
        </View>
    );
}

export function AgeForm(props) {
    return (
        <View style={styles.form}>
            <Text style={styles.title}>How old are you?</Text>
            <TextInput style={styles.textInput} onChangeText={props.onChange}></TextInput>
            <Text style={styles.subtitle}>Enter your age.</Text>
        </View>
    );
}


export function EmailForm(props) {
    return (
        <View style={styles.form}>
            <Text style={styles.title}>What is your email?</Text>
            <TextInput style={styles.textInput} onChangeText={props.onChange}></TextInput>
            <Text style={styles.subtitle}>Enter your email address.</Text>
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
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        borderColor: Colors.Grey,
        borderWidth: 1,
        marginVertical: 10,
        maxWidth: '80%',
    },
    form: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    }
});