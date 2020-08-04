import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput } from 'react-native';
import Colors from '../utilities/Colors';
import { CreateTwoOptionForm, ButtonRow, ScrollPicker } from '../components/Components';

export function AgeForm(props) {
    const DEFAULT_AGE = 20;
    const MIN_AGE = 14;
    const MAX_AGE = 99;
    return (
        <View style={styles.form}>
            <Text style={[styles.title, {marginBottom: 45}]}>How old are you?</Text>
            <ScrollPicker 
                data={[...Array(MAX_AGE - MIN_AGE).keys()].map(n => n + MIN_AGE)}
                initialValue={DEFAULT_AGE}
                onChange={(age) => props.onChange('age', age)}
            />
            <TouchableOpacity activeOpacity={0.8} style={styles.optionButton} onPress={() => props.onCompleted(true)}>
                <Text style={{color: Colors.PrimaryContrast}}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}


export function WeightForm(props) {
    const DEFAULT_WEIGHT = 180;
    const MIN_WEIGHT = 80;
    const MAX_WEIGHT = 350;
    return (
        <View style={styles.form}>
            <Text style={[styles.title, {marginBottom: 45}]}>How much do you weigh?</Text>
            <ScrollPicker 
                data={[...Array(MAX_WEIGHT - MIN_WEIGHT).keys()].map(n => n + MIN_WEIGHT)}
                initialValue={DEFAULT_WEIGHT}
                onChange={(age) => props.onChange('weight', age)}
            />
            <TouchableOpacity activeOpacity={0.8} style={styles.optionButton} onPress={() => props.onCompleted(true)}>
                <Text style={{color: Colors.PrimaryContrast}}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}

export const GenderForm = CreateTwoOptionForm({
    title: 'What is your gender?',
    field: 'gender',
    storeValue1: 'male',
    storeValue2: 'female',
    showValue1: 'Male',
    showValue2: 'Female'
});

export const GymAccessForm = CreateTwoOptionForm({
    title: 'Do you have gym access?',
    field: 'hasAccess',
    storeValue1: true,
    storeValue2: false,
    showValue1: "Yes",
    showValue2: "No"
});

export const WorkoutEquipmentForm = CreateTwoOptionForm({
    title: 'Do you have workout equipment?',
    field: 'hasEquipment',
    storeValue1: true,
    storeValue2: false,
    showValue1: "Yes",
    showValue2: "No"
});

export function HeightForm(props) {

    const [feet, setFeet] = useState(null);
    const [inches, setInches] = useState(6);

    return (
        <View style={styles.form}>
            <Text style={[styles.title, {padding: 10}]}>What is your height?</Text>
            <ButtonRow 
                field='feet' 
                buttons={[4, 5, 6]} 
                onChange={(f) => setFeet(f)} 
            />
            <ScrollPicker 
                field='inches'
                selectColor = {Colors.Primary}
                data={[...Array(12).keys()]}
                initialValue={6}
                onChange={(i) => setInches(i)}
            />
            <TouchableOpacity 
                activeOpacity={0.8} 
                style={[styles.optionButton, {marginTop: 50}]} 
                onPress={() => { 
                    if (feet !== null) {
                        console.log('height', 12 * feet + inches)
                        props.onChange('height', 12 * feet + inches);
                        props.onCompleted()
                    }
                }}>
                <Text style={{color: Colors.PrimaryContrast}}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        maxWidth: '80%',
        fontFamily: 'Comfortaa_300Light'
    },
    subtitle: {
        textAlign: 'center',
        maxWidth: '80%',
        marginBottom: 50,
    },
    textInput: {
        width: 350,
        backgroundColor: Colors.Background,
        paddingHorizontal: 24,
        fontSize: 16,
        paddingVertical: 16,
        borderRadius: 10,
        marginTop: 25,
        marginBottom: 10,
        maxWidth: '80%',
        textAlign: 'center'
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
    }
});