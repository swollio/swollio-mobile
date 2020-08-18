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
import headerStyles from '../styles/Header'

function capitalize(text) {
    return text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}


function Header(props) {
    return (
        <View style={{width: '100%', padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Icon onPress={() => props.pop()} size={30} color={Colors.SurfaceContrast} name={'arrow-left'}/>
            <OutlinedButton
                onPress={props.onCreateCustom}
                text="Custom Exercise"
                style={{width: 160, height: 40}}
            />
        </View>
    );
}


export function SelectExercise(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [createCustom, setCreateCustom] = useState(false);

    useEffect(() => {
        searchExercisesByName(searchTerm).then(data => {
            setSearchResults(data)
        });
    }, [searchTerm]);

    if (createCustom) {
        return <CreateCustomExercise
            team_id={props.user.team_id}
            onCancel={props.onCancel}
            onCreate={(exercise) => props.onSelect(exercise)}
        />
    }
    return <View style={{height: '100%', width: '100%'}}>
    <SafeAreaView />
        <Header onCreateCustom={() => setCreateCustom(true)} pop={props.onCancel} />
        <View style={{flexDirection: 'column', paddingHorizontal: 16}}>
            <View style={{flexDirection: 'row', backgroundColor: Colors.Background, borderRadius: 25, width: '100%', overflow: 'hidden'}}>
                <View style={{height: 50, alignItems: 'center', justifyContent: 'center', width: 50}}>
                <Icon 
                    name={'search'}
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
            <TouchableOpacity
                onPress={() => {props.onSelect(exercise)}}
                key={exercise.id}
                style={styles.section}
            >
                <Text style={styles.content}>{exercise.name}</Text>
                <Icon 
                    name={'plus'}
                    size={30}
                    color={Colors.Primary}
                />
            </TouchableOpacity>
        )}
        </ScrollView>
    </View>
}

function SelectWeightAndSetsForm(props) {
    
    const [reps, setReps] = useState([0, 0, 0, 0, 0])

    return (
        <View style={{width: '100%', alignItems: 'center'}}>
            <Text style={styles.formTitle}>How many reps should your athletes complete?</Text>
            <View style={{paddingVertical: 16}}>
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

            <SolidButton 
                width={200}
                text={'Continue'}
                onPress={() => {
                    props.onChange('rep_count', reps)
                    props.onCompleted()
                }}
            />
        </View>

    );
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


function AssignmentForm(props) {
    return (
        <FormContainer
            onCancel={() => props.onCancel()}
            onCompleted={(form) => {
                props.onCreate({
                    exercise_id: props.exercise.id,
                    name: props.exercise.name,
                    weight_scheme: 'constant',
                    rep_count: form.rep_count,
                })                    
            }}
            forms={[
                SelectWeightAndSetsForm,
            ]}
        />
    )
}

export function CreateCustomExercise(props) {
    return (
        <FormContainer
            onCancel={() => props.onCancel()}
            onCompleted={(form) => {
                createCustomExerciseForTeam(props.team_id, form).then((id) => {
                    props.onCreate({
                        id,
                        ...form
                    })                    
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
export function CreateAssignmentForm(props) {
    
    // If exercise is null, then the exercise hasnt been selected yet.
    // If the exercise is a non empty exercise object, then the exercise has been
    // selected, and the coach is in the process of setting weight, etc.
    // If the the exercise is an empty exercise object, then the exercise is a custom
    // form.
    const [exercise, setExercise] = useState(undefined);

    let content;
    if (exercise === undefined) {
        content = (
            <View style={{backgroundColor: Colors.Background, flex: 1}}>
                <SelectExercise
                    onCancel={props.onCancel}
                    onSelect={(exercise) => setExercise(exercise)}
                />
            </View>
        );
    } else if (exercise == null) {
        content = (<CreateCustomExercise
            team_id={props.user.team_id}
            onCancel={props.onCancel}
            onCreate={props.onCreate}
        />);
    } else {
        content = (
            <View style={{backgroundColor: Colors.Background, flex: 1}}>
                <AssignmentForm
                    exercise={exercise}
                    onCancel={props.onCancel}
                    onCreate={props.onCreate}
                />
            </View>
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