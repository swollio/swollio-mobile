import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../../utilities/Colors';
import ProgressDots from '../ProgressDots';

/**
 * This function will return a timer card that has the following props:
 * - exercises: string[] => An array of the exercises to be done
 * @param {Object} props All the props for this function
 */
export default function AbCard(props) {
    
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    
    return(
        <Card>
            <Text style = {styles.title}>{props.title}</Text>
            <View style={{alignItems: 'center'}}>
                <Text style = {styles.timer}>Timer Stuff</Text>
                <Text style = {styles.exercise}>{props.exercises[currentExerciseIndex]}</Text>
                <ProgressDots numDots = {props.exercises.length} numEnabled={currentExerciseIndex}/>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        color: Colors.SurfaceContrast,
        fontFamily: 'Comfortaa_400Regular',
        textAlign: 'left',
        margin: 10
    },
    timer: {
        fontSize: 69,
        fontFamily: 'Comfortaa_Regular400'
    },
    exercise: {
        fontSize: 24,
        fontFamily: "Comfortaa_Regular400"
    }
});