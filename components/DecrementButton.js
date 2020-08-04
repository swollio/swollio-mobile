import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../utilities/Colors'
import * as Haptics from 'expo-haptics';
/**
 * This functional component is a button decrementer that will
 * be used in places like rep counter. The props will be: 
 * val - the maximum and initial value of the button (required)
 * onPress - the action necessary on press of the button (optional)
 */
export default function DecrementButton(props) {

    function onPress() {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        if (props.value > 1) props.onChange(props.value - 1);
        else props.onChange(props.maxValue);
    }

    return(
        <TouchableOpacity activeOpacity={0.8} style={[styles.button, props.style]} onPress={onPress}>
            <Text style={styles.buttonText}>
                {props.value}
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