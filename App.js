import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Forms from './forms/Forms'
import Colors from './utilities/Colors';
import { useFonts, Comfortaa_300Light, Comfortaa_400Regular, Comfortaa_500Medium, Comfortaa_600SemiBold, Comfortaa_700Bold } from '@expo-google-fonts/comfortaa';
import UserPageView from './pages/Pages'
import { login, signup, createAthlete, createTeam } from './utilities/api'

const State = {
    LOGGED_IN: "LOGGED_IN",
    LOGGED_OUT: "LOGGED_OUT",
    SELECT_ROLE: "SELECT_ROLE",
    CREATE_USER: "CREATE_USER",
    CREATE_ATHLETE: "CREATE_ATHLETE",
    CREATE_TEAM: "CREATE_TEAM",
};

export default function App(props) {
    let [authenticationState, setAuthentiationState] = useState(State.LOGGED_OUT);
    let [fontsLoaded] = useFonts({
        Comfortaa_300Light,
        Comfortaa_400Regular,
        Comfortaa_500Medium,
        Comfortaa_600SemiBold,
        Comfortaa_700Bold
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
    case State.CREATE_USER:
        return (
            <Forms.CreateUserForm
                onCancel={() => setAuthentiationState(State.LOGGED_OUT)}
                onCompleted={(form) => {
                    signup(form).then(() => {
                        setAuthentiationState(State.SELECT_ROLE)
                    })
                }} 
            />
        )
    case State.CREATE_TEAM:
        return (
            <Forms.CreateTeamForm
                onCancel={() => setAuthentiationState(State.SELECT_ROLE)}
                onCompleted={(form) => {
                    createTeam(form).then(() => {
                        setAuthentiationState(State.LOGGED_IN)
                    })
                }}
            />
        )
    case State.SELECT_ROLE:
            return (
                <Forms.SelectAccountForm
                    onCancel={() => setAuthentiationState(State.LOGGED_OUT)}
                    onCompleted={(form) => {
                        if (form.role === 'athlete') {
                            setAuthentiationState(State.CREATE_ATHLETE)
                        } else {
                            setAuthentiationState(State.CREATE_TEAM)
                        }
                    }}
                />
            );
    case State.CREATE_ATHLETE:
        return (
            <Forms.CreateAthleteForm
                onCancel={() => setAuthentiationState(State.SELECT_ROLE)}
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