import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from '../../utilities/Colors';
import Card from './Card';
import DecrementButton from '../DecrementButton';
import CircularButton, { CircularTextButton } from '../CircularButton'
import Icon from 'react-native-vector-icons/Feather';
import ScrollPicker from '../ScrollPicker'

function capitalize(text) {
    return text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

/**
 * This component is a controller for a single 'row' in the WorkoutCard
 * container. It allows users to mark a set completed, change the weight,
 * and change the reps.
 */
function SingleSetRow(props) {

    return (
    <View style={[styles.rows, {justifyContent: 'space-between', alignItems: 'center'}]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <DecrementButton onChange={props.onChangeReps} style={{ paddingHorizontal: 8, backgroundColor: Colors.Primary }} val={props.reps} />
            <Icon style={{marginHorizontal: 8}} size={24} name={'x'}></Icon>
            <TouchableOpacity onPress={props.onEdit} style={{borderColor: Colors.Primary, borderWidth: 1, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16}}>
                <Text style={{fontSize: 22, textAlign: 'center', color: Colors.Primary}}>{props.weight} lbs.</Text>
            </TouchableOpacity>
        </View>
        <CircularButton icon={'check'} onPress={() => {}} radius={25} toggle={true} fontSize={20}></CircularButton>
    </View>
    )
}

/**
 * This will create a special card called workout card, where we have rows
 * of Scroll Wheels, and the dataVals for each scroll wheel is passed in as
 * an array in a list of arrays
 * 
 * @param {Object} props Contains props of workout card
 */
export default function WorkoutCard(props) {

    // Stores the index of the set for which the weight is currently being
    // edited. If no sets are currently being edited, then the editedSetIndex 
    // should be -1.
    const NotCurrentlyEditingWeight = -1;
    const [editedSetIndex, setEditedSetIndex] = useState(NotCurrentlyEditingWeight);

    const [chooseAlternatives, setChooseAlternatives] = useState(false);

    // Defining a constant which will make the appropriate amount
    // of scroll wheel rows
    const rowsView = props.sets.map((set, index) => {
        return <SingleSetRow 
            key={index}
            weight={props.results[index].weight}
            reps={props.results[index].reps}
            onChangeReps={(reps) => {
                props.results[index].reps = reps;
                props.onChange(props.results)
            }}
            onEdit={() => setEditedSetIndex(index)}
        />
    });

    const editView = editedSetIndex === NotCurrentlyEditingWeight ? <></> :
        <View style={{width: '100%', alignItems: 'center', paddingVertical: 20}}>
            <ScrollPicker 
                initialValue={weights[editedSetIndex]} 
                onChange={weight => {
                    props.results[editedSetIndex].weight = weight; 
                    props.onChange(props.results)
                }} 
                data={[...Array(100).keys()].map(x => (x + 1) * 5)}/>
            <TouchableOpacity onPress={() => setEditedSetIndex(NotCurrentlyEditingWeight)} style={styles.setWeight}>
                <Text style={{fontSize: 22, textAlign: 'center', color: Colors.Primary}}>Set Weight</Text>
            </TouchableOpacity>
        </View>
  
    return(
        <Card barColor={props.barColor}>
            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                <Text style={styles.title}>{capitalize(props.title)}</Text>
                {
                    chooseAlternatives ?
                    <Icon onPress={() => setChooseAlternatives(!chooseAlternatives)} style={{width: 60, textAlign: 'center'}} size={24} name={'x'}></Icon> :
                    <Icon onPress={() => setChooseAlternatives(!chooseAlternatives)} style={{width: 60, textAlign: 'center'}} size={24} name={'menu'}></Icon>
                }
            </View>
            { editedSetIndex == NotCurrentlyEditingWeight ? rowsView: editView}
        </Card>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        color: Colors.SurfaceContrast,
        fontFamily: 'Comfortaa_400Regular',
        textAlign: 'left',
        marginBottom: 15
    },
    rows: {
        flexDirection: 'row',
        borderColor: '#EEE',
        borderTopWidth: 1,
        padding: 5,
    },
    setWeight: {
        marginTop: 20, 
        borderColor: Colors.Primary, 
        borderWidth: 1, 
        height: 50, 
        borderRadius: 25, 
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingHorizontal: 16
    }
});