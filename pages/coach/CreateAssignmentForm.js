import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native'
import Colors from '../../utilities/Colors'
import { searchExercisesByName } from '../../utilities/api'
import Icon from 'react-native-vector-icons/Feather';
import ScrollPicker from '../../components/ScrollPicker';

function capitalize(text) {
    return text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

function Header(props) {
    return (
        <View style={styles.header}>
            <View style={{flexDirection: 'row', width: '100%', marginBottom: 8, alignItems: 'center', justifyContent: 'space-between'}}>
                <Icon 
                    onPress={props.onCancel}
                    size={40}
                    color={Colors.SurfaceContrast}
                    name={'arrow-left'}
                />
                <Text style={styles.title}>Exercises</Text>
                <View style={{width: 50}}></View>
            </View>
        </View>
        
    );
}

function SelectExercise(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        searchExercisesByName(searchTerm).then(data => {
            setSearchResults(data)
        });
    }, [searchTerm]);

    return <View style={{height: '100%', backgroundColor: Colors.Surface}}>
        <View style={{flexDirection: 'column', padding: 16}}>
            <View style={{flexDirection: 'row', backgroundColor: Colors.Background, borderRadius: 25, width: '100%', overflow: 'hidden'}}>
                <View style={{height: 50, alignItems: 'center', justifyContent: 'center', width: 50}}>
                <Icon 
                    name={'search'}
                    onPress={() => props.onSelect(exercise)}
                    size={30}
                    color={Colors.SurfaceContrast2}
                />
                </View>
                <TextInput
                    height={50} 
                    style={{padding: 8, height: 50, flex: 1}}
                    onChangeText={(text) => setSearchTerm(text)}
                    placeholder={'Search for exercises'}
                    value={searchTerm}
                />
            </View>
        </View>
        <ScrollView>
        {searchResults.map(exercise => 
            <View key={exercise.id} style={styles.section}>
                <Text style={styles.content}>{exercise.name}</Text>
                <Icon 
                    name={'plus'}
                    onPress={() => props.onSelect(exercise)}
                    size={30}
                    color={Colors.Primary}
                />
            </View>
        )}
        </ScrollView>
    </View>
}

function SelectWeightAndSets(props) {
    const [weightScheme, setWeightScheme] = useState('');
    const [setCount, setSetCount] = useState(0);

    return <View style={{flex: 1, padding: 24, justifyContent: 'space-between', backgroundColor: Colors.Surface, borderTopRightRadius: 20, borderTopLeftRadius: 20, alignItems: 'center'}}>
        <View style={{width: '100%', alignItems: 'center'}}>
            <Text style={styles.surfaceTitle}>{capitalize(props.exercise.name)}</Text>
            <Text style={{textAlign: 'center', marginVertical: 16}}>How many reps should your athletes complete?</Text>
            <View style={{alignItems: 'flex-start'}}>
            {
                ([...Array(setCount).keys()].map((_, i) => 
                <View key={i} style={{marginVertical: 4, width: 300, flexDirection: 'row', alignItems: "center", overflow: 'hidden', borderColor: Colors.Primary, borderWidth: 1, borderRadius: 25}}>
                      <View style={{alignItems: 'center', justifyContent: 'center', width: 50, height: 50}}>
                          <Icon 
                            onPress={() => setSetCount(setCount - 1)}
                            name={'x'}
                            size={20}
                            color={Colors.Primary}
                        />
                        </View>
                      <ScrollPicker
                        data={[...Array(50).keys()]}
                        />
                </View>))
            }
            <View style={{flexDirection: 'row', alignItems: 'flex-start',  marginVertical: 4}}>
                <TouchableOpacity 
                        activeOpacity={0.8}
                        onPress={() => { if (setCount <= 4) setSetCount(setCount + 1) }}
                        style={[styles.weightButton, setCount >= 5 ? {display: 'none'}: {}, {flexDirection: 'row', justifyContent: 'flex-start', width: 300, marginHorizontal: 0}]}
                    >
                    <Icon size={20} color={Colors.Primary} name='plus'></Icon>
                    <Text style={{fontSize: 18, marginHorizontal: 16, color: Colors.Primary}}>Add set</Text>
                </TouchableOpacity>
            </View>
            </View>


        </View>
        <TouchableOpacity 
            activeOpacity={0.8}
            style={styles.optionButton}
            onPress={() => props.onCreate({
                exercise_id: props.exercise.id,
                name: props.exercise.name,
                weight_scheme: 'constant',
                rep_count: []
            })}
        >
            <Text style={{color: Colors.PrimaryContrast}}>Add to Workout</Text>
        </TouchableOpacity>
    </View>
}

/**
 * The CreateAssignmentForm component is a full page component
 * which allows users to create a workout assignment. This component
 * handles the workflow of selecting an exercise, sets, reps, and
 * weight scheme.
 * 
 * The CreateAssignmentForm component has the following props:
 * - onCancel: callback to handle cancel action
 * - onCreate: callback to handle create action
 */
export default function CreateAssignmentForm(props) {
    
    const [exercise, setExercise] = useState(null);

    return <>
        <SafeAreaView style={styles.safeAreaTop} />
        <SafeAreaView style={styles.safeAreaBottom}>
            <Header onCancel={props.onCancel}></Header>
            <View style={{backgroundColor: Colors.Background, flex: 1}}>
                {exercise === null
                ? <SelectExercise
                    onCancel={props.onCancel}
                    onSelect={(exercise) => setExercise(exercise)}
                />
                : <SelectWeightAndSets
                    exercise={exercise}
                    onCancel={props.onCancel}
                    onCreate={props.onCreate}
                />}
            </View>
        </SafeAreaView>
    </>
}

const styles = StyleSheet.create({
    safeAreaTop: {
        flex: 0,
        backgroundColor: Colors.Surface
    },
    safeAreaBottom: {
        flex: 1,
        backgroundColor: Colors.Surface,
    },
    section: {
        borderColor: Colors.SurfaceContrast2,
        borderBottomWidth: 1,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    content: {
        color: Colors.BackgroundContrast,
    },
    title: {
        fontSize: 30,
        color: Colors.SurfaceContrast,
        fontFamily: 'Comfortaa_700Bold',
        textAlign: 'left',
    },
    surfaceTitle: {
        fontSize: 24,
        color: Colors.BackgroundContrast,
        fontFamily: 'Comfortaa_700Bold',
        textAlign: 'center',
        marginVertical: 24,
    },
    backButton: {
        backgroundColor: Colors.Surface,
        padding: 10,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%',
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        borderRightColor: Colors.Primary,
        borderTopColor: Colors.Primary,
        borderBottomColor: Colors.Primary,
        shadowColor: Colors.BackgroundContrast,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    header: {
        width: '100%',
        padding: 15,
        borderColor: Colors.Primary,
        borderBottomWidth: 2,
        backgroundColor: Colors.Surface,
        alignItems: 'flex-start',
    },
    weightButton: {
        borderColor: Colors.Primary,
        borderWidth: 1,
        height: 50,
        borderRadius: 25,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8
    },
    optionButton: {
        backgroundColor: Colors.Primary,
        width: 350,
        maxWidth: '80%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 25,
        shadowColor: Colors.BackgroundContrast,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 15,
        marginBottom: 10
    },
});