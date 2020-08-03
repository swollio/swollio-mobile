import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet} from 'react-native'
import Colors from '../utilities/Colors'
import Icon from 'react-native-vector-icons/Feather';

export default function CompleteSetButton(props) {

    const toggled = props.completed;

    return (
    <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
            if (!props.completed) props.onPress();
        }}
        style={[styles.circularButton, {
            width: 2 * props.radius || 60,
            height: 2 * props.radius || 60,
            borderRadius: props.radius || 30,
            backgroundColor: props.completed ? Colors.Primary : Colors.SurfaceContrast2
        }]}
    >
        <Icon
            name={props.icon}
            style={[styles.circularButtonIcon, {fontSize: props.fontSize || 30}]}
            color={Colors.PrimaryContrast}
        />
    </TouchableOpacity>);
}



export function CircularTextButton(props) {
    return (<TouchableOpacity
        activeOpacity={0.8}
        onPress={props.onPress}
        style={[styles.circularButton, {
            width: 2 * props.radius || 60,
            height: 2 * props.radius || 60,
            borderRadius: props.radius || 30,
        }]}
    >
        <Text style={[styles.circularButtonIcon, {fontSize: 20}]}>{props.title}</Text>
    </TouchableOpacity>);
}

const styles = StyleSheet.create({
    circularButtonIcon: {
        fontSize: 30,
        color: Colors.PrimaryContrast
    },
    circularButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.Primary,
    }
})