import React, { Component, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, Button, Dimensions} from 'react-native';
import Colors from './Colors';

export function ButtonRow(props) {
    
    const [states, setStates] = React.useState([false, false, false]);

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


const styles = StyleSheet.create({
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