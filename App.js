import React, { useState} from 'react';
import { Animated, StyleSheet, StatusBar, Text, View, ListItem, Dimensions, TouchableHighlight, ScrollView, FlatList} from 'react-native';
import FormContainer from './containers/FormContainer'
import PageView from './containers/PageView'
import * as Forms from './forms/Forms'
import Colors from './utilities/Colors';
import { useFonts, Comfortaa_300Light, Comfortaa_400Regular } from '@expo-google-fonts/comfortaa';
import { Card, ScrollWheel, WorkoutCard } from './components/Components'
import UserPageView, { UserPage, WorkoutsPage, StatisticsPage } from './pages/Pages'
import { login, signup, createAthlete } from './utilities/api'

const State = {
    LOGGED_IN: "LOGGED_IN",
    LOGGED_OUT: "LOGGED_OUT",
    CREATE_USER: "CREATE_USER",
    CREATE_ATHLETE: "CREATE_ATHLETE",
    CREATE_COACH: "CREATE_COACH",
};

export default function App(props) {
    let [authenticationState, setAuthentiationState] = useState(State.LOGGED_OUT);
    let [fontsLoaded] = useFonts({
        Comfortaa_300Light,
        Comfortaa_400Regular
    });

    if (!fontsLoaded) return <></>

    switch (authenticationState) {
    case State.LOGGED_IN:
        return  <UserPageView />;
    case State.LOGGED_OUT:
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Forms.LoginForm 
                    onCreateAccount={() => setAuthentiationState(State.CREATE_USER)}
                    onLogin={(credentials) => {
                        login(credentials).then(() => {
                            setAuthentiationState(State.LOGGED_IN)
                        })
                    }}
                />
            </View>
        );
    case State.CREATE_USER:
        return (
            <Forms.CreateUserForm
                onCancel={() => setAuthentiationState(State.LOGGED_OUT)}
                onCompleted={(form) => {
                    signup(form).then(() => {
                        setAuthentiationState(State.CREATE_ATHLETE)
                    })
                }} 
            />
        )
    case State.CREATE_ATHLETE:
        return (
            <Forms.CreateAthleteForm
                onCancel={() => setAuthentiationState(State.LOGGED_OUT)}
                onCompleted={(form) => {
                    createAthlete({age: form.age, height: 60, weight: 150, gender: form.gender}).then(() => {
                        setAuthentiationState(State.LOGGED_IN)
                    })
                }}
            />
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