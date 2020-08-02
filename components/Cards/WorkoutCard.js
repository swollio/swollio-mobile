import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from '../../utilities/Colors';
import ScrollWheel from '../ScrollWheel';
import Card from './Card';
import CircularButton, { CircularTextButton } from '../CircularButton'
import Icon from 'react-native-vector-icons/Feather';
import ScrollPicker from '../ScrollPicker'

function capitalize(text) {
    return text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

/**
 * This will create a special card called workout card, where we have rows
 * of Scroll Wheels, and the dataVals for each scroll wheel is passed in as
 * an array in a list of arrays
 * 
 * @param {Object} props Contains props of workout card
 */
export default function WorkoutCard(props) {

    const [edit, setEdit] = useState(false);
    const [chooseAlternatives, setChooseAlternatives] = useState(false);
    const [completed, setCompleted] = useState(0);

    // Defining a constant which will make the appropriate amount
    // of scroll wheel rows
    
    let alternatives = []
    
    let rows;

    if (!edit) {

        rows = props.scrollVals.map((arr, index) => {

       
            return (
                <View key={index} style={[styles.rows, {justifyContent: 'space-between', alignItems: 'center'}]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{backgroundColor: Colors.Primary, height: 50, width: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 8}}>
                        <Text style={{fontSize: 22, color: Colors.PrimaryContrast, textAlign: 'center'}}>10</Text>
                    </View>
                    <Icon style={{marginHorizontal: 8}} size={24} name={'x'}></Icon>
                    <TouchableOpacity onPress={() => setEdit(!edit)} style={{borderColor: Colors.Primary, borderWidth: 1, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16}}>
                        <Text style={{fontSize: 22, textAlign: 'center', color: Colors.Primary}}>45 lbs.</Text>
                    </TouchableOpacity>
                    </View>

                    <CircularButton onPress={() => setCompleted(completed + 1)} radius={25} toggle={true} fontSize={20} icon={'check'}></CircularButton>
                </View>
            );
        });

    } else {
        rows = <View style={{width: '100%', alignItems: 'center', paddingVertical: 20}}>
            <ScrollPicker data={[...Array(100).keys()].map(x => (x + 1) * 5)}/>
            <TouchableOpacity onPress={() => setEdit(!edit)} style={{marginTop: 20, borderColor: Colors.Primary, borderWidth: 1, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16}}>
                        <Text style={{fontSize: 22, textAlign: 'center', color: Colors.Primary}}>Set Weight</Text>
                    </TouchableOpacity>
            </View>
        /*
        return (
            <View key={index} style={[styles.rows, {justifyContent: 'space-between'}]}>
                <CircularTextButton radius={22} title={'10x'}></CircularTextButton>
                <ScrollWheel vals={arr} selectColor={props.selectColor} onChange={props.onChange} />
                <CircularButton onPress={() => {}} radius={20} toggle={true} fontSize={20} icon={'check'}></CircularButton>
            </View>
        );*/
        }
        /**/
        /*
        return (
            <View key={index} style={styles.rows}>
                <CircularTextButton radius={24} title={10}></CircularTextButton>
                <View style={{width: 16}}></View>
                <ScrollWheel vals={arr} selectColor={props.selectColor} onChange={props.onChange} />
            </View>
        );*/
   

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
            { chooseAlternatives ? alternatives: rows}
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
    }
});