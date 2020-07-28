import React, { useState} from 'react';
import { Animated, StyleSheet, StatusBar, Text, View, ListItem, Dimensions, TouchableHighlight, ScrollView, FlatList} from 'react-native';
import FormContainer from './containers/FormContainer'
import PageView from './containers/PageView'
import * as Forms from './forms/Forms'
import Colors from './utilities/Colors';
import { useFonts, Comfortaa_300Light, Comfortaa_400Regular, Comfortaa_500Medium, Comfortaa_600SemiBold, Comfortaa_700Bold } from '@expo-google-fonts/comfortaa';
import { Card, ScrollWheel, WorkoutCard } from './components/Components'
import { UserPage, WorkoutsPage, StatisticsPage } from './pages/Pages'
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
        Comfortaa_400Regular,
        Comfortaa_500Medium,
        Comfortaa_600SemiBold,
        Comfortaa_700Bold
    });

    if (!fontsLoaded) return <></>

    if (authenticationState === State.LOGGED_IN) {
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
    } else if (authenticationState === State.CREATE_USER) {
        return (
            <FormContainer
                key={1}
                onCancel={() => setAuthentiationState(State.LOGGED_OUT)}
                onCompleted={(form) => {
                    signup(form).then(() => {
                        setAuthentiationState(State.CREATE_ATHLETE)
                    })
                }} 
                forms={[
                    Forms.FirstNameForm,
                    Forms.LastNameForm,
                    Forms.EmailForm,
                    Forms.PasswordForm,
            ]}/>
        )
    } else if (authenticationState === State.CREATE_ATHLETE) {
        return (
            <FormContainer
                key={2}
                onCancel={() => setAuthentiationState(State.LOGGED_OUT)}
                onCompleted={(form) => {
                    createAthlete({age: form.age, height: 60, weight: 150, gender: form.gender}).then(() => {
                        setAuthentiationState(State.LOGGED_IN)
                    })
                }} 

                forms={[
                    Forms.AccountCreatedForm,
                    Forms.AgeForm,
                    Forms.HeightForm,
                    Forms.GenderForm,
                    Forms.GymAccessForm,
                    Forms.WorkoutEquipmentForm
            ]}/>
        )
    } else if (authenticationState === State.LOGGED_OUT) {
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