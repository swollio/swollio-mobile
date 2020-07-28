import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, ScrollView, TextInput } from 'react-native';
import Colors from '../utilities/Colors';
import { Card } from '../components/Components'
import { getWorkoutForTeam } from '../utilities/api'
import Icon from 'react-native-vector-icons/Feather';

export default function CoachWorkoutsPage(props) {

    const [assignments, setAssignments] = useState(null);
    
    useEffect(() => {
        if (assignments === null)
            getWorkoutForTeam(props.user.team_id, props.workout.id).then(data => {
                console.log(data)
                setAssignments(data)
            });
    });

    return (
        <View style={{backgroundColor: Colors.White, flex: 1}}>
            <View style={styles.header}>
                <Icon onPress={() => props.pop()} size={40} color={Colors.White} name={'arrow-left'}/>
                <Text style={styles.title}>Details</Text>
                <Icon size={40} color={Colors.White} name={'plus'}/>
            </View>
            <View>
                {assignments === null ? <Text>Loading...</Text>: 
                <View>
                    <View style={{padding: 8, borderBottomColor: Colors.Grey, borderBottomWidth: 1}}>
                        <TextInput style={styles.textInput} value={props.workout.name} />
                        <View style={{marginVertical: 12, flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontSize: 18, marginRight: 8}}>Repeat:</Text>
                            <View style={{justifyContent: 'center', borderColor: Colors.Green, height: 28, borderWidth: 1, paddingHorizontal: 12, borderRadius: 14}}>
                                <Text style={{color: Colors.Green, fontSize: 16}}>{props.workout.repeat}</Text>
                            </View>
                        </View>
                    </View>
                    {
                        assignments.map((a, index) =>
                        <View key={index} style={{padding: 16, borderBottomColor: Colors.Grey, borderBottomWidth: 1}}>
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
        backgroundColor: Colors.Green,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    watermark: {
        textAlign: 'center',
        fontSize: 24,
        color: Colors.Grey,
        margin: 50,
    },
    title: {
        fontSize: 30,
        color: Colors.White,
        fontFamily: 'Comfortaa_700Bold',
        textAlign: 'center',
    },
    textInput: {
        width: '100%',
        backgroundColor: Colors.LightGrey,
        paddingHorizontal: 18,
        fontSize: 24,
        paddingVertical: 8,
        borderRadius: 10,
        textAlign: 'left'
    },
})