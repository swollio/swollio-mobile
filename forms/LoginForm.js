import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, KeyboardAvoidingView, Text, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import SolidButton from '../components/SolidButton'
import OutlinedButton from '../components/OutlinedButton'
import ErrorMessage from '../components/ErrorMessage'

import Colors from '../utilities/Colors';
import config from '../config.json';

/**
 * The LoginForm component is a full page component that provides an interface
 * for users to enter their email and password.
 * 
 * @param onLogin {(email: string, password: string) => void}
 * @param onCreateAccount {() => void}
 * @param errorMessage {string}
 */
export default function LoginForm(props) {

    // When devMode is enabled, the app should login by default to the user specified
    // in the config file.
    if (config.devMode) props.onLogin(config.credentials)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <SafeAreaView style={{width: '100%'}}>
            <KeyboardAvoidingView style={styles.form} behavior={'padding'}>
                
                <View></View>

                <View style={{paddingHorizontal: 36, width: '100%'}}>

                    <Text style={styles.title}>Welcome.</Text>
                    <Text style={styles.subtitle}>Please login to continue</Text>

                    <ErrorMessage title={'Login Failed'} message={props.errorMessage}/>

                    <View style={styles.textInput}>
                        <Icon size={30} name={'mail'}/>
                        <TextInput 
                            style={{flex: 1, paddingHorizontal: 8, fontSize: 16}}
                            onChangeText={(text) => setEmail(text)}
                            autoCorrect={false}
                            placeholder={'email'}
                            autoCapitalize='none'
                            keyboardAppearance='light'
                            keyboardType='email-address'
                        />
                    </View>
                    
                    <View style={styles.textInput}>
                        <Icon size={30} name={'key'}/>
                        <TextInput 
                            style={{flex: 1, paddingHorizontal: 8, fontSize: 16}}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                            placeholder={'password'}
                            autoCorrect={false}
                            keyboardAppearance='light'
                        />
                    </View>
                </View>

                <View style={{width: '100%', alignItems: 'center'}}>

                    <SolidButton
                        text={'Login'}
                        style={{margin: 8}}
                        onPress={() => props.onLogin({email, password})}
                    />

                    <OutlinedButton
                        text={'Create Account'}
                        style={{margin: 8}}
                        onPress={() => props.onCreateAccount()}
                    />
                </View>
                
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        textAlign: 'center',
        maxWidth: '80%',
        fontFamily: 'Comfortaa_300Light',
        color: Colors.SurfaceContrast,
        textAlign: 'left',
        width: '100%'
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        maxWidth: '80%',
        fontFamily: 'Comfortaa_300Light',
        color: Colors.SurfaceContrast2,
        textAlign: 'left',
        width: '100%',
        marginVertical: 8,
    },
    textInput: {
        color: Colors.SurfaceContrast,
        backgroundColor: Colors.Background,
        paddingHorizontal: 16,
        fontSize: 16,
        paddingVertical: 8,
        borderRadius: 10,
        marginVertical: 8,
        textAlign: 'center',
        flexDirection: 'row'
    },
    form: {
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        width: '100%',
    },
});