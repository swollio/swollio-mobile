import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function OptionButton (props) {
    return(
        <TouchableOpacity
            style={[styles.optionButton, props.style]}
            onPress={props.onPress}>
            { props.children }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    optionButton: {
        width: "80%",
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 25,
        marginTop: 15,
        marginBottom: 10
    },
});