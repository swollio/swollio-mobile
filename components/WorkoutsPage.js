import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../utilities/Colors';

export default function WorkoutsPage(props) {
    return (<View style={styles.header}>
        <Text style={styles.title}>Workouts</Text>
    </View>)
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        padding: 20,
        backgroundColor: Colors.Green,
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