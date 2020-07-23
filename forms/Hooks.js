import React, { Component, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, Button, Dimensions} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Colors from './Colors';

export function ButtonRow(props) {
    
    const [states, setStates] = useState([false, false, false]);

    // Toggles states[index] on and everything else off
    function stateController(index) {

        if (states[index])
            return;
        
        const newStates = [false, false, false];
        newStates[index] = true;

        setStates(newStates);
    }

    const buttonList = props.buttons.map((button, index) => {
        return (
            <TouchableOpacity 
                key={index}
                style = {[
                    styles.toggleButton, states[index] ? 
                    {
                        backgroundColor: Colors.Red,
                        borderColor: Colors.White,
                    } : 
                    {
                        backgroundColor: Colors.White,
                        borderColor: Colors.Red,
                }]}
                onPress={() => stateController(index)}>
                    <Text 
                        style={[
                            styles.buttonText, states[index] ? 
                            { color: Colors.White } : 
                            { color: Colors.Red }
                        ]} >
                        {button}
                    </Text>
            </TouchableOpacity>
        );
    });

    return (
        <View style={styles.buttonRow}>
            {buttonList}
        </View>
    );
}

export function CreateSingleStringForm(options) {
    return (props) => {
        const [value, setValue] = useState('');
        const valid = options.validator(value);
        
        function submitValues() {
            if (valid) {
                props.onChange(options.field, value)
                props.onCompleted()
            }
        }

        return (
            <View style={styles.form}>
                <Text style={styles.title}>{options.title}</Text>
                <TextInput 
                    style={styles.textInput} 
                    keyboardType={options.keyboardType} 
                    onChangeText={(text) => setValue(text)}
                    autoCorrect={false}
                    keyboardAppearance='light'
                    autoCapitalize={options.noCaps ? 'none' : 'sentences'}
                    onSubmitEditing={submitValues}
                />
                <Text style={styles.subtitle}>{options.subtitle}</Text>
                <TouchableOpacity 
                    activeOpacity={0.8}
                    style={valid ? styles.optionButton: styles.disabledButton}
                    onPress={submitValues}
                >
                        <Text style={valid ?  {color: Colors.White}: {color: Colors.Grey}}>Continue</Text>
                </TouchableOpacity>
                <KeyboardSpacer />
            </View>
        );
    }
}

export function CreateTwoOptionForm (options) {

    return props => {
        return (
            <View style={styles.form}>
                <Text style={styles.title}>{options.title}</Text>
                <TouchableOpacity
                    style={styles.optionButton}
                    onPress={() => {
                        props.onChange(options.field, options.storeValue1);
                        props.onCompleted();
                    }}>
                    <Text style={{color: Colors.White}}>
                        {options.showValue1}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.optionButton}
                    onPress={() => {
                        props.onChange(options.field, options.storeValue2);
                        props.onCompleted();
                    }}>
                    <Text style={{color: Colors.White}}>
                        {options.showValue2}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };
}

/*
export const GenderForm = CreateSingleStringForm({
    title: 'What is your gender?',
    field: 'gender',
    option1: 'male',
    option2: 'female'
});
*/

/*
export function GenderForm(props) {
    return (
        <View style={styles.form}>
            <Text style={styles.title}>What is your gender?</Text>
            <TouchableOpacity
                style={styles.optionButton}
                onPress={() => {
                    props.onChange('gender', 'male');
                    props.onCompleted();
                }}>
                <Text style={{color: Colors.White}}>
                    Male
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.optionButton}
                onPress={() => {
                    props.onChange('gender', 'female');
                    props.onCompleted();
                }}>
                <Text style={{color: Colors.White}}>
                    Female
                </Text>
            </TouchableOpacity>
        </View>
    );
}
*/

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
        borderWidth: 1,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 30,
        marginBottom: 50,
    },
    buttonText: {
        fontSize: 26,
    },
})