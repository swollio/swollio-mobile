import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, Button, Dimensions} from 'react-native';
import Colors from '../utilities/Colors';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { CreateSingleStringForm, CreateTwoOptionForm, ButtonRow, ScrollWheel } from '../components/Components';

export function LoginForm(props) {
    
    return (
        <View style={styles.form}>
            <Text style={styles.title}>Login</Text>
            <TextInput 
                style={styles.textInput} 
                onChangeText={props.onChange}
                placeholder='email'
                autoCorrect={false}
                autoCapitalize='none'
                keyboardAppearance='light'
                keyboardType='email-address'
            />
            <TextInput 
                style={styles.textInput} 
                onChangeText={props.onChange}
                placeholder='password'
                secureTextEntry={true}
                autoCorrect={false}
                keyboardAppearance='light'
            />

            <TouchableOpacity onPress={() => props.onLogin()} activeOpacity={0.8} style={styles.optionButton}>
                    <Text style={{color: Colors.White}}>Login</Text>
            </TouchableOpacity>

            <View style={{height: 50}}></View>
            <TouchableOpacity onPress={() => props.onCreateAccount()} activeOpacity={0.8} style={styles.inverseOptionButton}>
                    <Text style={{color: Colors.Red}}>Create Account</Text>
            </TouchableOpacity>

            <KeyboardSpacer />
        </View>
    );
}

export const FirstNameForm = CreateSingleStringForm({
    title: 'What is your first name?',
    subtitle: 'Enter your first name.',
    keyboardType: 'default',
    validator: (value) => value !== '',
    field: 'first_name'
});

export const LastNameForm = CreateSingleStringForm({
    title: 'What is your last name?',
    subtitle: 'Enter your last name.',
    keyboardType: 'default',
    validator: (value) => value !== '',
    field: 'last_name'
});

export const EmailForm = CreateSingleStringForm({
    title: 'What is your email?',
    subtitle: 'Enter your email address.',
    keyboardType: 'email-address',
    validator: (value) => /(.+)@(.+){2,}\.(.+){2,}/.test(value), // ab*@cd*.ef*
    field: 'email',
    noCaps: true
});

export function PasswordForm(props) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const valid = password != '' && password === confirmPassword;

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Create a password.</Text>
            <TextInput 
                style={styles.textInput} 
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                autoCorrect={false}
                keyboardAppearance='light'
            />

            <Text style={[styles.subtitle, {marginBottom: 10}]}>Enter your password</Text>

            <TextInput 
                style={styles.textInput} 
                onChangeText={(text) => setConfirmPassword(text)}
                secureTextEntry={true}
                autoCorrect={false}
                keyboardAppearance='light'
            />


            <Text style={styles.subtitle}>Repeat your password</Text>
            <TouchableOpacity 
                activeOpacity={0.8}
                style={valid ? styles.optionButton: styles.disabledButton}
                onPress={() => {
                    if (valid) {
                        props.onChange('password', password)
                        props.onCompleted(true)
                    }
                }}
            >
                <Text style={{color: Colors.White}}>Create Account</Text>
            </TouchableOpacity>
            <KeyboardSpacer />
        </View>
    );
}

export function AccountCreatedForm(props) {
    
    return (
        <View style={styles.form}>
            <Text style={[styles.title, {marginBottom: 20}]}>Your account has been created.</Text>
            <Text style={styles.subtitle}>Before you get started, we will ask you a few more questions to improve your workout experience</Text>
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
                onChangeText={(text) => props.onChange('age', text)} 
                keyboardType={'numeric'}
                keyboardAppearance='light' 
                placeholder='69' />
            <Text style={styles.subtitle}>Enter your age.</Text>
            <TouchableOpacity activeOpacity={0.8} style={styles.optionButton} onPress={() => props.onCompleted(true)}>
                <Text style={{color: Colors.White}}>Continue</Text>
            </TouchableOpacity>
            <KeyboardSpacer/>
        </View>
    );
}


export const GenderForm = CreateTwoOptionForm({
    title: 'What is your gender?',
    field: 'gender',
    storeValue1: 'male',
    storeValue2: 'female',
    showValue1: 'Male',
    showValue2: 'Female'
});

export const GymAccessForm = CreateTwoOptionForm({
    title: 'Do you have gym access?',
    field: 'hasAccess',
    storeValue1: true,
    storeValue2: false,
    showValue1: "Yes",
    showValue2: "No"
});

export const WorkoutEquipmentForm = CreateTwoOptionForm({
    title: 'Do you have workout equipment?',
    field: 'hasEquipment',
    storeValue1: true,
    storeValue2: false,
    showValue1: "Yes",
    showValue2: "No"
});

export function HeightForm(props) {
    return (
        <View style={styles.form}>
            <Text style={[styles.title, {padding: 10}]}>What is your height?</Text>
            <ButtonRow 
                field='feet' 
                buttons={['4\'', '5\'', '6\'']} 
                onChange={props.onChange} 
            />
            <ScrollWheel 
                field='inches'
                minVal={0} 
                maxVal={11} 
                deltaVal={1} 
                initIndex={0}
                onChange={props.onChange}
            />
            <TouchableOpacity activeOpacity={0.8} style={styles.optionButton} onPress={() => props.onCompleted()}>
                <Text style={{color: Colors.White}}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        textAlign: 'center',
        maxWidth: '80%',
        fontFamily: 'Comfortaa_300Light'
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
    disabledButton: {
        backgroundColor: Colors.LightGrey,
        width: 350,
        maxWidth: '80%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 25,
        marginTop: 15,
        marginBottom: 10
    },
    inverseOptionButton: {
        width: 350,
        maxWidth: '80%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderColor: Colors.Red,
        borderWidth: 1,
        borderRadius: 25,
        marginTop: 15,
        marginBottom: 10
    },
});