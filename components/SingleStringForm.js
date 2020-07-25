import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Colors from '../utilities/Colors';

/**
 * This function returns a fully created form that has a single text input field.
 * The parameter options contains the data necessary to distinguish SingleStringForms from each other.
 * We return a function which takes in props, so that we can use JSX to pass in properties that
 * defines the actions of the Form's components.
 * 
 * @param {Object} options Options contain the fields necessary to distinguish components
 */
export default function CreateSingleStringForm(options) {
    return (props) => {
        // value is going to be a stateful property keeping track of the
        // text in the text box
        const [value, setValue] = useState('');
        const valid = options.validator(value);
        
        // When the submit button is pressed, call the onChange and complete 
        // functions passed in as props to confirm values
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
                    onPress={submitValues}>
                        <Text style={valid ?  {color: Colors.White}: {color: Colors.Grey}}>Continue</Text>
                </TouchableOpacity>
                <KeyboardSpacer />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    form: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
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
    subtitle: {
        textAlign: 'center',
        maxWidth: '80%',
        marginBottom: 50,
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
});