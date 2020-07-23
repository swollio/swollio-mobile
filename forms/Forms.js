import React, { Component, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, Button, Dimensions} from 'react-native';
import Colors from './Colors';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { ButtonRow } from './Hooks';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';

export function LoginForm(props) {
    
    return (
        <View style={styles.form}>
            <Text style={styles.title}>Login</Text>
            <TextInput 
                style={styles.textInput} 
                onChangeText={props.onChange}
                placeholder='email'
            />
            <TextInput 
                style={styles.textInput} 
                onChangeText={props.onChange}
                placeholder='password'
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


export function PasswordForm(props) {
    
    return (
        <View style={styles.form}>
            <Text style={styles.title}>Create a Password</Text>
            <TextInput 
                style={styles.textInput} 
                onChangeText={props.onChange}
                secureTextEntry={true}  />
            <Text style={[styles.subtitle, {marginBottom: 10}]}>Enter your password</Text>

            <TextInput 
                style={styles.textInput} 
                onChangeText={props.onChange}
                secureTextEntry={true}  />
            <Text style={styles.subtitle}>Repeat your password</Text>
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

export function HeightForm(props) {
    return (
        <View style={styles.form}>
            <Text style={[styles.title, {padding: 10}]}>What is your height?</Text>
            <ButtonRow buttons={['4\'', '5\'', '6\'']}/>
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
    inverseOptionButton: {
        width: 350,
        maxWidth: '80%',
        height: 50,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        padding: 10,
        borderColor: Colors.Red,
        borderWidth: 1,
        borderRadius: 25,
        marginTop: 15,
        marginBottom: 10
    },
});