import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native'
import Colors from '../utilities/Colors'
import { searchExercisesByName } from '../utilities/api'
import Icon from 'react-native-vector-icons/Feather';
import ScrollWheel from '../components/ScrollWheel'

function capitalize(text) {
    return text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}
function SelectExercise(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        searchExercisesByName(searchTerm).then(data => {
            setSearchResults(data)
        });
    }, [searchTerm]);

    return <View style={{height: '100%', backgroundColor: Colors.Surface, borderTopRightRadius: 20, borderTopLeftRadius: 20}}>
        <View style={{flexDirection: 'column', padding: 16}}>
            <View style={{flexDirection: 'row', borderColor: Colors.Primary, borderBottomWidth: 1, width: '100%', overflow: 'hidden'}}>
                <View style={{height: 50, alignItems: 'center', justifyContent: 'center', width: 50}}>
                <Icon 
                    name={'search'}
                    onPress={() => props.onSelect(exercise)}
                    size={30}
                    color={Colors.Primary}
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
                    name={'chevron-right'}
                    onPress={() => props.onSelect(exercise)}
                    size={40}
                    color={Colors.Primary}
                />
            </View>
        )}
        </ScrollView>
    </View>
}

function SelectWeightAndSets(props) {
    const [weightScheme, setWeightScheme] = useState('');

    return <View style={{flex: 1, padding: 24, justifyContent: 'space-between', backgroundColor: Colors.Surface, borderTopRightRadius: 20, borderTopLeftRadius: 20, alignItems: 'center'}}>
        <View style={{width: '100%', alignItems: 'center'}}>
            <Text style={styles.surfaceTitle}>{capitalize(props.exercise.name)}</Text>
            <Text style={{textAlign: 'center'}}>What weight should your athletes use?</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 24}}>
                <TouchableOpacity 
                    activeOpacity={0.8}
                    style={styles.weightButton}
                >
                    <Text style={{fontSize: 18, color: Colors.Primary}}>Constant</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    activeOpacity={0.8}
                    style={styles.weightButton}
                >
                    <Text style={{fontSize: 18, color: Colors.Primary}}>Increasing</Text>
                </TouchableOpacity>
            </View>
            <Text style={{textAlign: 'center'}}>How many reps should your athletes complete?</Text>
            {
                ([...Array(5).keys()].map((_, i) => 
                <View key={i} style={{marginVertical: 8}}>
                    <ScrollWheel vals={[0, 5, 1]}></ScrollWheel>
                </View>))
            }
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
            <View style={styles.header}>
                <TouchableOpacity activeOpacity={0.8} style={styles.backButton} onPress={props.onCancel}>
                    <Icon size={30} color={Colors.Primary} name='arrow-left'></Icon>
                </TouchableOpacity>
            </View>
            <View style={{backgroundColor: Colors.Primary, flex: 1}}>
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
        backgroundColor: Colors.Primary
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
        fontSize: 24,
        color: Colors.BackgroundContrast,
        fontFamily: 'Comfortaa_700Bold',
        textAlign: 'left',
        margin: 16,
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
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        shadowColor: Colors.BackgroundContrast,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    header: {
        width: '100%',
        paddingTop: 10,
        paddingBottom: 30,
        backgroundColor: Colors.Primary
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