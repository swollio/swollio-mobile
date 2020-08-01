import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import Colors from '../../utilities/Colors';
import Icon from 'react-native-vector-icons/Feather';
import { getWorkoutForAthlete } from '../../utilities/api';
import { WorkoutCard } from '../../components/Components';


export default function WorkoutProgress(props) {
    
    const [assignments, setAssignments] = useState(null);
    

    useEffect(() => {
        if (assignments === null)
            getWorkoutForAthlete(props.user.athlete_id, props.workout.id).then(data => {
                setAssignments(data);
            });
    });
    
    const Assignments = (assignments || []).map((assignment, index) => {
        return (
            <WorkoutCard 
                key = {index}
                scrollVals = {
                    [[5, 35, 5, 2],
                    [5, 35, 5, 2],
                    [5, 35, 5, 2],]}
                selectColor = {Colors.Primary}
                barColor = {Colors.Primary}
                title={assignment.name}
                onChange = {() => {}}
            />
        );
    })

    return (
        <>
            <SafeAreaView style={styles.safeAreaTop} />
            <View style={styles.header}>
                <Icon 
                    name={'arrow-left'}
                    style={styles.headerIcon}
                    onPress={props.pop}
                />
                <Text style={styles.headerText}>Workout</Text>
                <Icon 
                    name={'check'}
                    style={styles.headerIcon}
                    onPress={props.pop}
                />
            </View>
            <ScrollView padding={10} style={{backgroundColor: Colors.Background}}>
                { Assignments }
            </ScrollView>
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
        justifyContent: 'space-between',
        padding: 8,
        backgroundColor: Colors.Primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerIcon: {
        fontSize: 30,
        color: Colors.PrimaryContrast,
    },
    headerText: {
        fontSize: 24,
        color: Colors.PrimaryContrast,
        fontFamily: 'Comfortaa_700Bold',
        textAlign: 'left',
    }
})