import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native'
import Colors from '../../utilities/Colors'
import { searchExercisesByName, getMusclesList, createCustomExerciseForTeam } from '../../utilities/api'
import Icon from 'react-native-vector-icons/Feather';
import ScrollPicker from '../../components/ScrollPicker';
import OutlinedButton from '../../components/OutlinedButton'
import { CreateSingleStringForm } from '../../components/Components';
import FormContainer from '../../containers/FormContainer'
import SolidButton from '../../components/SolidButton'
import BubbleSelect from '../../components/BubbleSelect'

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
        <ScrollView style={{flex: 1}}>
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
        <View style={{paddingVertical: 24, justifyContent: 'center',         borderColor: Colors.Primary,
        borderTopWidth: 2, alignItems: 'center'}}>
            <Text style={{padding: 16, fontSize: 18, fontFamily: 'Comfortaa_400Regular'}}>Can't find your exercise?</Text>
            <OutlinedButton title={'Custom Exercise'} onPress={() => props.onSelect(null)}/>
        </View>
    </View>
}

function SelectWeightAndSets(props) {
    
    const [reps, setReps] = useState([])

    return <View style={{flex: 1, padding: 24, justifyContent: 'space-between', backgroundColor: Colors.Surface, borderTopRightRadius: 20, borderTopLeftRadius: 20, alignItems: 'center'}}>
        <View style={{width: '100%', alignItems: 'center'}}>
            <Text style={styles.surfaceTitle}>{capitalize(props.exercise.name)}</Text>
            <Text style={{textAlign: 'center', marginVertical: 16}}>How many reps should your athletes complete?</Text>
            <View style={{alignItems: 'flex-start'}}>
            {
                (reps.map((repCount, i) => 
                <View key={i + '-' + repCount} style={{marginVertical: 4, width: 355, flexDirection: 'row', alignItems: "center", overflow: 'hidden', borderColor: Colors.Primary, borderWidth: 1, borderRadius: 30}}>
                      <TouchableOpacity 
                      activeOpacity={0.8}
                        onPress={() => {setReps([...reps.slice(0, i), ...reps.slice(i + 1, reps.length)])}}
                        style={{alignItems: 'center', justifyContent: 'center', width: 50, height: 60}}>
                          <Icon 
                            name={'x'}
                            size={20}
                            color={Colors.Primary}
                        />
                        </TouchableOpacity>
                      <ScrollPicker
                        initialValue={repCount}
                        data={[...Array(100).keys()]}
                        onChange={x => {reps[i] = x; setReps(reps)}}
                    />
                </View>))
            }
            <View style={{flexDirection: 'row', alignItems: 'flex-start',  marginVertical: 4}}>
                <TouchableOpacity 
                        activeOpacity={0.8}
                        onPress={() => { if (reps.length <= 4) setReps([...reps, 5]) }}
                        style={[styles.weightButton, reps.length >= 5 ? {display: 'none'}: {}, {flexDirection: 'row', justifyContent: 'flex-start', width: 300, marginHorizontal: 0}]}
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
                rep_count: reps
            })}
        >
            <Text style={{color: Colors.PrimaryContrast}}>Add to Workout</Text>
        </TouchableOpacity>
    </View>
}

const ExerciseNameForm = CreateSingleStringForm({
    title: 'What is the exercise name?',
    subtitle: 'Enter the exercise name.',
    keyboardType: 'default',
    validator: (value) => value !== '',
    field: 'name',
    dismissKeyboard: true,
});

function SelectPrimaryMusclesForm(props) {
    
    const muscles = getMusclesList();
    return (
        <View style={{width: '100%', alignItems: 'center'}}>
        <Text style={styles.formTitle}>What muscles does this exercise work?</Text>
        <BubbleSelect 
            items={muscles}
            id={(x) => x.id}
            text={(x) => x.nickname}
            onChange={(m) => props.onChange('muscles', m)}
        />
        <SolidButton 
            width={200}
            text={'Continue'}
            onPress={() => props.onCompleted()}
        />
        </View>
    );
}


function ExerciseCreatedForm(props) {
    
    const muscles = getMusclesList();
    return (
        <View style={{width: '100%', padding: 16, alignItems: 'center'}}>
            <Text style={styles.formTitle}>Exercise Created.</Text>
            <Text style={{marginVertical: 24, textAlign: 'center'}}>In the future, this exercise will show up in your search results.</Text>
            <SolidButton 
                width={200}
                text={'Continue'}
                onPress={() => props.onCompleted()}
            />
        </View>
    );
}

function CreateCustomExercise(props) {
    return (
        <FormContainer
            onCancel={() => props.onCancel()}
            onCompleted={(form) => {
                createCustomExerciseForTeam(props.team_id, form).then((id) => {
                    console.log(id)
                    props.onCreate(form)
                }).catch(err => {
                    console.log(err)
                })
            }}
            forms={[
                ExerciseNameForm,
                SelectPrimaryMusclesForm,
                ExerciseCreatedForm
            ]}
        />
    )
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
    
    // If exercise is null, then the exercise hasnt been selected yet.
    // If the exercise is a non empty exercise object, then the exercise has been
    // selected, and the coach is in the process of setting weight, etc.
    // If the the exercise is an empty exercise object, then the exercise is a custom
    // form.
    const [exercise, setExercise] = useState(undefined);

    let content;
    if (exercise === undefined) {
        content = (
            <>
                <Header onCancel={props.onCancel}></Header>
                <View style={{backgroundColor: Colors.Background, flex: 1}}>
                    <SelectExercise
                        onCancel={props.onCancel}
                        onSelect={(exercise) => setExercise(exercise)}
                    />
                </View>
            </>
        );
    } else if (exercise == null) {
        content = (<CreateCustomExercise
            team_id={props.user.team_id}
            onCancel={props.onCancel}
            onCreate={props.onCreate}
        />);
    } else {
        content = (
            <>
                <Header onCancel={props.onCancel}></Header>
                <View style={{backgroundColor: Colors.Background, flex: 1}}>
                    <SelectWeightAndSets
                        exercise={exercise}
                        onCancel={props.onCancel}
                        onCreate={props.onCreate}
                    />
                </View>
            </>
        );
    }

    return <>
        <SafeAreaView style={styles.safeAreaTop} />
        <SafeAreaView style={styles.safeAreaBottom}>
            {content}
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
    formTitle: {
        fontSize: 30,
        textAlign: 'center',
        maxWidth: '80%',
        fontFamily: 'Comfortaa_300Light'
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