import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from './Card';
import OptionButton from '../OptionButton';
import { getWorkoutsForAthlete } from '../../utilities/api';
import Colors from '../../utilities/Colors';
import moment from 'moment';

const repeatResponse = {
    daily: "This workout repeats daily",
    weekly: "This workout repeats weekly",
    never: "This workout does not repeat"
}

export default function WorkoutCover (props) {

    return (
        <Card barColor = {props.color} >
            <View>
                <Text style={styles.workoutTitle}>{props.title}</Text>
                <Text style={styles.workoutSubtitle}>{moment(props.created).format('MM-DD-YYYY')}</Text>
                <Text style={styles.workoutSubtitle}>{repeatResponse[props.repeat]}</Text>
                <Text style={styles.workoutSubtitle}>Estimated Time: 45</Text>
                <View style={{alignItems: 'center'}}>
                    <OptionButton style = {[styles.optionButton, { borderColor: props.color }]} onPress={props.onStartWorkout}>
                        <Text style={[styles.buttonText, { color: props.color }]}>Start</Text>
                    </OptionButton>
                </View>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    workoutTitle: {
        fontSize: 26,
        fontFamily: "Comfortaa_400Regular",
        marginLeft: 10,
        marginBottom: 5,
        textAlign: 'left',
    },
    workoutSubtitle: {
        fontSize: 16,
        fontFamily: "Comfortaa_400Regular",
        margin: 5,
        marginLeft: 10,
    },
    optionButton: {
        width: "80%",
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderWidth: 1,
        borderRadius: 25,
        marginTop: 15,
        marginBottom: 10
    },
    buttonText: {
        fontFamily: "Comfortaa_400Regular",
        fontSize: 18,
        textAlign: 'center',
    }
});