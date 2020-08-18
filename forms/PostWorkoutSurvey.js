import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Colors from '../utilities/Colors';
import { ButtonRow, ScrollPicker, OptionButton } from "../components/Components";
import { postPostWorkoutSurvey } from "../utilities/api";


export default function PostWorkoutSurvey(props) {
    const [workoutRating, setWorkoutRating] = useState(-1);
    const [hoursSleep, setHoursSleep] = useState(6);
    const [wellnessVal, setWellnessVal] = useState(-1);

    return (
        <>
            <SafeAreaView style={styles.safeAreaTop} />
            <View style={styles.header}>
                <Text style={styles.headerText}>Post Workout Survey</Text>
            </View>
            <View style={styles.form}>
                <Text style={styles.question}>Give this workout a rating: </Text>
                <ButtonRow 
                    style={styles.toggleButton} 
                    buttons={[1, 2, 3, 4, 5]}
                    onChange={(val) => setWorkoutRating(val)} 
                />
                <Text style={styles.question}>How many hours of sleep did you get?</Text>
                <ScrollPicker
                    style={styles.scrollPicker}
                    field='hours_sleep'
                    selectColor={Colors.Primary}
                    data={[...Array(12).keys(), "12+"]}
                    initialValue={6}
                    onChange={(i) => setHoursSleep(i)}
                />
                <Text style={styles.question}>Please rank how you are feeling today: </Text>
                <ButtonRow 
                    style={styles.toggleButton} 
                    buttons={[1, 2, 3, 4, 5]} 
                    onChange={(val) => setWellnessVal(val)}
                />
            </View>
            <View style={{alignItems: 'center', marginBottom: 150}}>
                <OptionButton 
                    style={{backgroundColor: Colors.Primary, height: 50}} 
                    onPress={() => { 
                    postPostWorkoutSurvey(props.user.athlete_id, props.workout.workout_id,
                    {
                        due_date: props.workout.date,
                        rating: workoutRating,
                        hours_sleep: hoursSleep,
                        wellness: wellnessVal
                    })
                    .then(_ => props.pop(2));
                }}>
                    <Text style={{color: Colors.PrimaryContrast, fontSize: 22 }}>Finish Workout</Text>
                </OptionButton>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    safeAreaTop: {
        flex: 0,
        backgroundColor: Colors.Primary
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: Colors.Primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerText: {
        fontSize: 24,
        color: Colors.PrimaryContrast,
        fontFamily: 'Comfortaa_700Bold',
        textAlign: 'left',
        marginLeft: 20,
        marginBottom: 10,
        marginTop: 10
    },
    form: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    question: {
        fontSize: 20,
        fontFamily: "Comfortaa_600SemiBold",
        textAlign: 'left',
    },
    headerIcon: {
        fontSize: 30,
        color: Colors.PrimaryContrast,
    },
    toggleButton: {
        padding: 10,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        marginRight: 8,
        marginLeft: 8,
        marginTop: 20,
        marginBottom: 20,
    },
    scrollPicker: {
        marginTop: 20,
        marginBottom: 20,
        borderColor: Colors.Primary,
        borderWidth: 1,
        borderRadius: 30,
    }
});