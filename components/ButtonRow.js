import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Colors from '../utilities/Colors';

/**
 * This function returns a stateful component which manages a row of buttons.
 * The buttons will have values determined by the buttons prop passed in
 * 
 * @param {Object} props Contains all the props passed in with the JSX component
 */
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
        allButtonsOff[index] = true;

        setStates([...allButtonsOff]);

        // Since the button is toggled, and if there is an onChange
        // action passed into this component, execute it at the change
        if (props.onChange)
            props.onChange(props.buttons[index])
    }

    // Since we want a variable amount of buttons in a button row, we
    // are going to make an array of <TouchableOpacity> components
    // with texts in them to account for the variable amount of buttons.
    const buttonList = props.buttons.map((button, index) => {
        return (
            <TouchableOpacity 
                key={index}
                style = {[
                    states[index] ? 
                    {
                        backgroundColor: Colors.Primary,
                        borderColor: Colors.PrimaryContrast,
                    } : 
                    {
                        backgroundColor: Colors.PrimaryContrast,
                        borderColor: Colors.Primary,
                }, props.style]}
                onPress={() => stateController(index)}>
                    <Text 
                        style={[
                            styles.buttonText, states[index] ? 
                            { color: Colors.PrimaryContrast } : 
                            { color: Colors.Primary }
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