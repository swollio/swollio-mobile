import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Colors from '../utilities/Colors';

export default function ButtonRow(props) {
    
    // Creating an array of all false values to signify
    // all buttons being off
    const allButtonsOff = [];
    props.buttons.forEach(_ => allButtonsOff.push(false));

    const [states, setStates] = useState(allButtonsOff);

    // Toggles states[index] on and everything else off
    function stateController(index) {

        // If this state is true, the button is already
        // pressed, so pass through the function
        if (states[index])
            return;
        
        // If not, go back to an allButtonsOff array
        // and only turn the button that is pressed on
        const newStates = allButtonsOff;
        newStates[index] = true;

        setStates(newStates);

        // Since the button is toggled, and if there is an onChange
        // action passed into this component, execute it at the change
        if (props.onChange)
            props.onChange(props.field, props.buttons[index])
    }

    // Since we want a variable amount of buttons in a button row, we
    // are going to make an array of <TouchableOpacity> components
    // with texts in them to account for the variable amount of buttons.
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

    // We return the buttonList defined above embedded in a horizontal view
    return (
        <View style={styles.buttonRow}>
            {buttonList}
        </View>
    );
}

const styles = StyleSheet.create({
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
        marginBottom: 30,
    },
    buttonText: {
        fontSize: 26,
    },
    buttonRow: {
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
});