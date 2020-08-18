import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Text, TextInput, View, StyleSheet} from 'react-native';

import WorkoutDetailsItem from './WorkoutDetailsItem'
import Colors from '../../utilities/Colors';
import moment from 'moment'
import SolidButton from '../../components/SolidButton';
import { OutlinedButton } from '../../components/Components';
import headerStyles from '../styles/Header'

const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];

/**
 * WorkoutDetailsHeader is a header component for displaying workout details.
 * It displays navigation icons ('back' and 'finish') as well as information
 * about a workout such as the date, the repeat status, etc. Future metadata
 * about a workout such as primary muscle groups should be displayed here as
 * well.
 * 
 * PropType:
 * - onBack: () => () 
 * - onFinish: () => ()
 * - options: { created: string, repeat: string }
 */
export default function WorkoutDetailsHeader(props) {
    
    return (
        <View style={[headerStyles.container, headerStyles.header]}>
            <View style={[styles.header, {paddingVertical: 16}]}>
                <Icon 
                    name={'arrow-left'}
                    style={[styles.headerIcon, {width: 80}]}
                    onPress={props.onBack}
                />
                <OutlinedButton
                    text="Save Workout"
                    onPress={props.onFinish}
                    style={{width: 160, height: 40}}
                />
            </View>
            <TextInput 
                placeholder={'Untitled Workout'}
                onChangeText={(text) => props.onChangeName(text)}
                style={[headerStyles.title, {
                    borderColor: Colors.SurfaceContrast2,
                    borderBottomWidth: 1,
                    paddingVertical: 8,
                }]}
            >{props.options.name}</TextInput>
            <View style={{flexDirection: 'row', paddingTop: 16, justifyContent: 'flex-start', alignItems: 'center'}}>
                <Icon size={36} style={{paddingHorizontal: 16}} name={'calendar'}/>
                <OutlinedButton style={{width: 'auto', paddingHorizontal: 24}} text={`${props.options.dates.size} workout dates`} onPress={props.onToggleCalendar}/>
            </View>  
        </View>
        
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        padding: 16,
        borderColor: Colors.Primary,
        borderBottomWidth: 1,
        backgroundColor: Colors.Surface,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerIcon: {
        fontSize: 30,
        color: Colors.SurfaceContrast,
    },
    headerText: {
        fontSize: 24,
        color: Colors.SurfaceContrast,
        fontFamily: 'Comfortaa_700Bold',
        textAlign: 'left',
    }
});

