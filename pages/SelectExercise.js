import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import Colors from '../utilities/Colors';
import { searchExercisesByName } from '../utilities/api'
import Icon from 'react-native-vector-icons/Feather';

function Header(props) {
    return (
        <View style={styles.header}>
            <Icon onPress={() => props.pop()} size={40} color={Colors.PrimaryContrast} name={'arrow-left'}/>
            <Text style={styles.title}>Exercises</Text>
            <View style={{width: 50}}></View>
        </View>
    );
}
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
        <View style={{backgroundColor: Colors.Surface, height: '100%'}}>
            <Header push={props.push} pop={props.pop} />
            <View style={{flex: 1}}>
                <View style={{padding: 16, borderBottomColor: Colors.SurfaceContrast2, borderBottomWidth: 1}}>
                    <TextInput onChangeText={(value) => setSearchTerm(value)} style={styles.textInput} />
                </View>
                <ScrollView  style={{flex: 1}}>
                {
                    exerciseResults.map((a, index) =>
                        <View key={index} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomColor: Colors.Grey, borderBottomWidth: 1}}>
                            <Text style={{fontSize: 16}}>{a.name}</Text>
                            <Icon onPress={() => props.pop()} size={40} color={Colors.Primary} name={'chevron-right'}/>
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
        fontSize: 24,
        paddingVertical: 8,
        borderRadius: 10,
        textAlign: 'left'
    },
})