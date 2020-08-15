import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import OutlinedButton from '../OutlinedButton'
import Colors from '../../utilities/Colors';
import ProgressDots from '../ProgressDots';
import Card from '../Cards/Card'
import Icon from 'react-native-vector-icons/Feather';
import Timer from '../Timer';
import CircularButton from '../CircularButton';
import AbSetup from "./AbSetup";

function AbstructionStartCard(props) {
    return (
    <Card>
        <View style={{alignItems: 'center', padding: 10}}>
        <Text style={[styles.title, {marginBottom: 40}]}>Abstruction</Text>
        <OutlinedButton text={'Start'} onPress={props.onPress}/>
        </View>
    </Card>
    );
}

function AbstructionCompletedCard(props) {
    return (
    <Card>
        <View style={{justifyContent: 'center', alignItems: 'center', paddingVertical: 16}}>
            <Text style={styles.mega}>Completed</Text>
            <Text style={styles.body}>Way to go! Feel stronger yet?</Text>
            <View style={{width: 60, height: 60, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderRadius: 30,borderColor: Colors.Primary}}>
                <Icon name={'check'} size={40} style={{color: Colors.Primary}}/>
            </View>
        </View>
    </Card>
    );
}

/**
 * This function will return a timer card that has the following props:
 * - exercises: string[] => An array of the exercises to be done
 * @param {Object} props All the props for this function
 */
export function AbTimerCard(props) {
    
    const [play, setPlay] = useState(true);

    return(
        <Card>
            <View style={{alignItems: 'center'}}>
                <Timer paused={!play} onFinish={props.onFinish} timerVal={props.duration}/>
                <Text style = {styles.exercise}>{props.exercise}</Text>
                <View style={{ flexDirection: 'row'}}>
                    <CircularButton 
                        style={{ margin: 10 }} 
                        icon="rewind"
                        onPress={() => props.onRewind()}
                    />
                    <CircularButton 
                        style={{ margin: 10 }}
                        icon={play ? "pause" : "play"} 
                        onPress={() => setPlay(!play) }
                    />
                    <CircularButton 
                        style={{ margin: 10 }} 
                        icon="fast-forward"
                        onPress={() => props.onFastForward()}
                    />
                </View>
                <ProgressDots style={{ margin: 80 / props.exerciseCount , marginTop: 20 }} numDots = {props.exerciseCount} numEnabled={props.exerciseIndex + 1}/>
            </View>
        </Card>
    );
}

export default function AbCard(props) {
    const [duration, setDuration] = useState(0);
    const [numExercises, setNumExercises] = useState(0);

    const [progressState, setProgressState] = useState('setup');
    const MAX_INDEX = numExercises - 1;
    const [index, setIndex] = useState(0);

    const [totalTime, setTotalTime] = useState("");
    
    useEffect(() => {
        const totalSeconds = duration * numExercises;
        const minutes = Number.parseInt(totalSeconds / 60);
        const seconds = totalSeconds - minutes * 60;
        if (minutes < 10)
            setTotalTime("0" + minutes + ":" + (seconds === 0 ? "00" : seconds));
        else
            setTotalTime(minutes + ":" + (seconds === 0 ? "00" : seconds));
    }, [duration, numExercises]);

    switch (progressState) {
        case 'setup':
            return <AbSetup
                        totalTime={totalTime}
                        onPress={(button) => setDuration(button)}
                        onChange={(val) => setNumExercises(val)}
                        onFinish={() => { 
                            if (duration !== 0) setProgressState('in_progress')
                            else alert("Please enter a duration!");
                        }} 
                    />;
        case 'in_progress':
            return (
            <AbTimerCard 
                key={index}
                title="Abstruction"
                onFinish={() => {
                    if (index < MAX_INDEX) setIndex(index + 1) 
                    if (index === MAX_INDEX) setProgressState('completed')
                }}
                onRewind={() => { 
                    if (index > 0) setIndex(index - 1)
                    if (index === 0)
                        setProgressState('setup')

                }}
                onFastForward={() => { 
                    if (index < MAX_INDEX) setIndex(index + 1);
                    if (index === MAX_INDEX) setProgressState('completed')
                 }}
                exercise={props.exercises[index]}
                exerciseCount={numExercises}
                duration={duration}
                exerciseIndex={index}
            />)
        case 'completed':
            return <AbstructionCompletedCard />
    }
}


const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        color: Colors.SurfaceContrast,
        fontFamily: 'Comfortaa_400Regular',
        textAlign: 'left',
        margin: 10
    },
    mega: {
        fontSize: 36,
        fontFamily: 'Comfortaa_400Regular',
    },
    body: {
        fontSize: 16,
        fontFamily: 'Comfortaa_400Regular',
        marginVertical: 16,
    },
    timer: {
        fontSize: 69,
        fontFamily: 'Comfortaa_400Regular',
        margin: 10
    },
    exercise: {
        fontSize: 24,
        fontFamily: "Comfortaa_400Regular",
        marginBottom: 10
    }
});