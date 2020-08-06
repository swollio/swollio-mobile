import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from './Card';
import OptionButton from '../OptionButton';
import { getWorkoutsForAthlete } from '../../utilities/api';
import Colors from '../../utilities/Colors';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';

const repeatResponse = {
    daily: "This workout repeats daily",
    weekly: "This workout repeats weekly",
    none: "This workout does not repeat"
}

export default function WorkoutCover (props) {

    return (
        <Card barColor = {props.color} >
            <View>
                <Text style={styles.workoutTitle}>{props.title}</Text>
                <Text style={styles.workoutSubtitle}>{props.team_name}</Text>
                <View style={{alignItems: 'center'}}>
                    {props.completed ? <View style={{width: 60, height: 60, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderRadius: 30,borderColor: Colors.Primary}}>
                <Icon name={'check'} size={40} style={{color: Colors.Primary}}/>
            </View>:
                    <OptionButton style = {[styles.optionButton, { borderColor: props.color }]} onPress={props.onStartWorkout}>
                        <Text style={[styles.buttonText, { color: props.color }]}>Start</Text>
                    </OptionButton>
                    }
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
        fontSize: 18,
        fontFamily: "Comfortaa_400Regular",
        color: Colors.SurfaceContrast2,
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