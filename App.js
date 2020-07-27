import React, { useState} from 'react';
import { Animated, StyleSheet, StatusBar, Text, View, ListItem, Dimensions, TouchableHighlight, ScrollView, FlatList} from 'react-native';
import FormContainer from './containers/FormContainer'
import PageView from './containers/PageView'
import * as Forms from './forms/Forms'
import Colors from './utilities/Colors';
import { useFonts, Comfortaa_300Light, Comfortaa_400Regular } from '@expo-google-fonts/comfortaa';
import { Card, ScrollWheel, WorkoutCard, UserPage, WorkoutsPage, StatisticsPage } from './components/Components'
import { login, signup } from './utilities/api'

export default function App(props) {
    let [authenticationState, setAuthentiationState] = useState('UNAUTHENTICATED');
    let [fontsLoaded] = useFonts({
        Comfortaa_300Light,
        Comfortaa_400Regular
    });

    if (!fontsLoaded) return <></>

    if (authenticationState === 'AUTHENTICATED') {
        return (
            <PageView pages={[{
                content: UserPage,
                color: Colors.Red,
                icon: 'user'
            }, {
                content: WorkoutsPage,
                color: Colors.Green,
                icon: 'clipboard'
            }, {
                content: StatisticsPage,
                color: Colors.Purple,
                icon: 'bar-chart-2'
            }]}>
            </PageView>
        )
    } else if (authenticationState === 'CREATE_ACCOUNT') {
        return (
            <FormContainer
                key={1}
                onCancel={() => setAuthentiationState('UNAUTHENTICATED')}
                onCompleted={(form) => {
                    signup(form).then(() => {
                        setAuthentiationState('SETUP_ACCOUNT')
                    })
                }} 
                forms={[
                    Forms.FirstNameForm,
                    Forms.LastNameForm,
                    Forms.EmailForm,
                    Forms.PasswordForm,
            ]}/>
        )
    } else if (authenticationState === 'SETUP_ACCOUNT') {
        return (
            <FormContainer
                key={2}
                onCancel={() => setAuthentiationState('UNAUTHENTICATED')}
                onCompleted={(form) => {console.log(form); setAuthentiationState('AUTHENTICATED')}} 
                forms={[
                    Forms.AccountCreatedForm,
                    Forms.AgeForm,
                    Forms.HeightForm,
                    Forms.GenderForm,
                    Forms.GymAccessForm,
                    Forms.WorkoutEquipmentForm
            ]}/>
        )
    } else if (authenticationState === 'UNAUTHENTICATED') {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Forms.LoginForm 
                    onCreateAccount={() =>  setAuthentiationState('CREATE_ACCOUNT')}
                    onLogin={(credentials) => {
                        login(credentials).then(() => {
                            setAuthentiationState('AUTHENTICATED')
                        })
                    }}
                />
            </View>
        );
    }
};


const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        color: Colors.Black,
        fontFamily: 'Comfortaa_400Regular',
        textAlign: 'left',
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5
    },
    rows: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});