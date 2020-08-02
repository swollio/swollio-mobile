import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../utilities/Colors'

/**
 * This functional component is a button decrementer that will
 * be used in places like rep counter. The props will be: 
 * val - the maximum and initial value of the button (required)
 * onPress - the action necessary on press of the button (optional)
 */
export default function DecrementButton(props) {

    const [buttonVal, setButtonVal] = useState(props.val);

    function onPress() {
        if (buttonVal > 1) setButtonVal(buttonVal - 1);
        else setButtonVal(props.val);

        if (props.onChange) props.onChange(buttonVal);
    }

    return(
        <TouchableOpacity activeOpacity={0.8} style={[styles.button, props.style]} onPress={onPress}>
            <Text style={styles.buttonText}>
                {buttonVal}
            </Text>
        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50,
        borderRadius: 25
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 22,
        fontFamily: "Comfortaa_400Regular",
        color: Colors.PrimaryContrast
    }
});