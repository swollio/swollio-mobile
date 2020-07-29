import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, ScrollView, TextInput } from 'react-native';
import Colors from '../utilities/Colors';
import { Card } from '../components/Components'
import { getWorkoutForTeam } from '../utilities/api'
import Icon from 'react-native-vector-icons/Feather';
import SelectExercise from './SelectExercise';

function Header(props) {
    return (
        <View style={styles.header}>
            <Icon 
                onPress={() => props.pop()}
                size={40}
                color={Colors.PrimaryContrast}
                name={'arrow-left'}
            />
            <Text style={styles.title}>Details</Text>
            <Icon onPress={() => props.push(
                    <SelectExercise
                        push={props.push}
                        pop={props.pop}
                    />
                )}
                size={40}
                color={Colors.PrimaryContrast}
                name={'plus'}
            />
        </View>
    );
}
export default function CoachWorkoutsDetails(props) {

    const [assignments, setAssignments] = useState(null);
    
    useEffect(() => {
        if (assignments === null)
            getWorkoutForTeam(props.user.team_id, props.workout.id).then(data => {
                console.log(data)
                setAssignments(data)
            });
    });

    return (
        <View style={{backgroundColor: Colors.Surface, flex: 1}}>
            <Header push={props.push} pop={props.pop}/>
            <View>
                {assignments === null ? <Text>Loading...</Text>: 
                <View>
                    <View style={{padding: 8, borderBottomColor: Colors.SurfaceContrast2, borderBottomWidth: 1}}>
                        <TextInput style={styles.textInput} value={props.workout.name} />
                        <View style={{marginVertical: 12, flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontSize: 18, marginRight: 8}}>Repeat:</Text>
                            <View style={{justifyContent: 'center', borderColor: Colors.Primary, height: 28, borderWidth: 1, paddingHorizontal: 12, borderRadius: 14}}>
                                <Text style={{color: Colors.Primary, fontSize: 16}}>{props.workout.repeat}</Text>
                            </View>
                        </View>
                    </View>
                    {
                        assignments.map((a, index) =>
                        <View key={index} style={{padding: 16, borderBottomColor: Colors.SurfaceContrast2, borderBottomWidth: 1}}>
                            <Text style={{fontSize: 16, fontWeight: '800'}}>{a.name}</Text>
                            <Text style={{fontSize: 16}}>weight: {a.weight_scheme}</Text>
                        </View>
                        )
                    }
                </View>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        padding: 15,
        paddingLeft: 20,
        paddingBottom: 20,
        backgroundColor: Colors.Primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    watermark: {
        textAlign: 'center',
        fontSize: 24,
        color: Colors.SurfaceContrast2,
        margin: 50,
    },
    title: {
        fontSize: 30,
        color: Colors.PrimaryContrast,
        fontFamily: 'Comfortaa_700Bold',
        textAlign: 'center',
    },
    textInput: {
        width: '100%',
        backgroundColor: Colors.Background,
        paddingHorizontal: 18,
        color: Colors.BackgroundContrast,
        fontSize: 24,
        paddingVertical: 8,
        borderColor: Colors.SurfaceContrast2,
        borderWidth: 1,
        borderRadius: 10,
        textAlign: 'left'
    },
})