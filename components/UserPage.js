import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../utilities/Colors';

export default function UserPage(props) {

    return (
        <View style={styles.header}>
            <Text style={styles.title}>Hello {props.user.first_name}!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        padding: 20,
        backgroundColor: Colors.Red,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    title: {
        fontSize: 28,
        color: Colors.Black,
        fontFamily: 'Comfortaa_400Regular',
        textAlign: 'left',
        marginLeft: 10
    }
})