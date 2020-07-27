import React, { useState} from 'react';
import { Animated, StyleSheet, StatusBar, Text, View, ListItem, Dimensions, TouchableHighlight, ScrollView, FlatList} from 'react-native';
import FormContainer from './containers/FormContainer'
import PageView from './containers/PageView'
import * as Forms from './forms/Forms'
import Colors from './utilities/Colors';
import { useFonts, Comfortaa_300Light, Comfortaa_400Regular } from '@expo-google-fonts/comfortaa';
import { Card, ScrollWheel, WorkoutCard, DataCard } from './components/Components'

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
                header: (props) => <Text style={{fontSize: 24, color: Colors.White, textAlign: 'center'}}>User</Text>,
                icon: 'user'
            }, {
                header: (props) => <Text style={{fontSize: 24, color: Colors.White, textAlign: 'center'}}>Workouts</Text>,
                icon: 'clipboard'
            }, {
                header: (props) => <Text style={{fontSize: 24, color: Colors.White, textAlign: 'center'}}>Statistics</Text>,
                icon: 'bar-chart-2'
            }]}>
                <WorkoutCard 
                    title='Overhead Press'
                    barColor={Colors.Green}
                    scrollVals={[[5, 80, 5, 2],
                                [15, 35, 5, 2],
                                [15, 35, 5, 2],
                            ]}
                    />
                {/* <DataCard /> */}
            </PageView>
        )
    } else if (authenticationState === 'CREATE_ACCOUNT') {
        return (
            <FormContainer
                key={1}
                onCancel={() => setAuthentiationState('UNAUTHENTICATED')}
                onCompleted={(form) => {console.log(form); setAuthentiationState('SETUP_ACCOUNT')}} 
                forms={[
                    Forms.FirstNameForm,
                    Forms.LastNameForm,
                    Forms.EmailForm,
                    Forms.PasswordForm,
                    Forms.AccountCreatedForm,
            ]}/>
        )
    } else if (authenticationState === 'SETUP_ACCOUNT') {
        return (
            <FormContainer
                key={2}
                onCancel={() => setAuthentiationState('UNAUTHENTICATED')}
                onCompleted={(form) => {console.log(form); setAuthentiationState('AUTHENTICATED')}} 
                forms={[
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
                    onLogin={() => setAuthentiationState('AUTHENTICATED')}
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