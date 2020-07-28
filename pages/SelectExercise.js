import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import Colors from '../utilities/Colors';
import { searchExercisesByName } from '../utilities/api'
import Icon from 'react-native-vector-icons/Feather';

export default function CoachWorkoutsPage(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [exerciseResults, setExerciseResults] = useState([]);
    
    useEffect(() => {
        searchExercisesByName(searchTerm).then(data => {
            console.log(data)
            setExerciseResults(data)
        });
    }, [searchTerm]);

    return (
        <View style={{backgroundColor: Colors.White, height: '100%'}}>
            <View style={styles.header}>
                <Icon onPress={() => props.pop()} size={40} color={Colors.White} name={'arrow-left'}/>
                <Text style={styles.title}>Exercises</Text>
                <View style={{width: 50}}></View>
            </View>
            <View style={{flex: 1}}>
                <View style={{padding: 16, borderBottomColor: Colors.Grey, borderBottomWidth: 1}}>
                    <TextInput onChangeText={(value) => setSearchTerm(value)} style={styles.textInput} />
                </View>
                <ScrollView  style={{flex: 1}}>
                {
                    exerciseResults.map((a, index) =>
                        <View key={index} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomColor: Colors.Grey, borderBottomWidth: 1}}>
                            <Text style={{fontSize: 16}}>{a.name}</Text>
                            <Icon onPress={() => props.pop()} size={40} color={Colors.Green} name={'chevron-right'}/>
                        </View>
                    )
                }
                </ScrollView>
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