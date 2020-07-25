import React, { useState} from 'react';
import { Animated, StyleSheet, StatusBar, Text, View, ListItem, Dimensions, TouchableHighlight, ScrollView, FlatList} from 'react-native';
import FormContainer from './containers/FormContainer'
import PageView from './containers/PageView'
import * as Forms from './forms/Forms'
import Colors from './utilities/Colors';
import { ScrollWheel } from './components/Hooks';
import { useFonts, Comfortaa_300Light } from '@expo-google-fonts/comfortaa';

export default function App(props) {
    
    const testSlider = true;

    return(
        <View>
            <ScrollWheel minVal={0} maxVal={12} deltaVal={1} initIndex={6}/>
        </View>
    );

    // Uncomment this to run the normie code

    /*
    let [authenticationState, setAuthentiationState] = useState('UNAUTHENTICATED');
    let [fontsLoaded] = useFonts({
        Comfortaa_300Light,
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
            }]}/>
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
    */
};
