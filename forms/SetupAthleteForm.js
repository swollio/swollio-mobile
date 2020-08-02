import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput } from 'react-native';
import Colors from '../utilities/Colors';
import { CreateTwoOptionForm, ButtonRow, ScrollPicker } from '../components/Components';

export function AgeForm(props) {
    return (
        <View style={styles.form}>
            <Text style={styles.title}>How old are you?</Text>
            <TextInput 
                style={styles.textInput} 
                onChangeText={(text) => props.onChange('age', text)} 
                keyboardType={'numeric'}
                keyboardAppearance='light' 
                placeholder='69' />
            <Text style={styles.subtitle}>Enter your age.</Text>
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
    return (
        <View style={styles.form}>
            <Text style={[styles.title, {padding: 10}]}>What is your height?</Text>
            <ButtonRow 
                field='feet' 
                buttons={['4\'', '5\'', '6\'']} 
                onChange={props.onChange} 
            />
            <ScrollPicker 
                field='inches'
                selectColor = {Colors.Primary}
                data={[...Array(12).keys()]}
                initialValue={6}
                onChange={props.onChange}
            />
            <TouchableOpacity 
                activeOpacity={0.8} 
                style={[styles.optionButton, 
                {marginTop: 50}]} 
                onPress={() => props.onCompleted()}>
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