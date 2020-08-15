import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import Colors from '../utilities/Colors'

export default function OutlinedButton (props) {
    return(
        <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.optionButton, props.style]}
            onPress={props.onPress}>
            <Text style={styles.title}>{props.text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    title: {
        color: Colors.Primary,
        fontSize: 16,
        fontFamily: "Comfortaa_400Regular",
        textAlign: 'center',
    },
    optionButton: {
        height: 44,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: Colors.Primary,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%'
    }
});