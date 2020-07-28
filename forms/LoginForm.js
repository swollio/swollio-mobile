import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput } from 'react-native';
import Colors from '../utilities/Colors';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import config from '../config.json';
import { login } from '../utilities/api';

export default function LoginForm(props) {

    if (config.devMode)
        props.onLogin(config.credentials)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Login</Text>
            <TextInput 
                style={styles.textInput} 
                onChangeText={(text) => setEmail(text)}
                placeholder='email'
                autoCorrect={false}
                autoCapitalize='none'
                keyboardAppearance='light'
                keyboardType='email-address'
            />
            <TextInput 
                style={styles.textInput} 
                onChangeText={(text) => setPassword(text)}
                placeholder='password'
                secureTextEntry={true}
                autoCorrect={false}
                keyboardAppearance='light'
            />

            <TouchableOpacity onPress={() => props.onLogin({email, password})} activeOpacity={0.8} style={styles.optionButton}>
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

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        textAlign: 'center',
        maxWidth: '80%',
        fontFamily: 'Comfortaa_300Light'
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