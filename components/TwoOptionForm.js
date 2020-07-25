import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Colors from '../utilities/Colors';

/**
 * This function returns a fully created form that has a two option layout.
 * The parameter options contains the data necessary to distinguish TwoOptionsForms from each other.
 * We return a function which takes in props, so that we can use JSX to pass in properties that
 * defines the actions of the Form's components.
 * 
 * @param {Object} options Options contain the fields necessary to distinguish components
 */
export default function CreateTwoOptionForm (options) {

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
});