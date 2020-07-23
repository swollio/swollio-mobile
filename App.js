import React, { useState } from 'react';
import { Animated, StyleSheet, StatusBar, Text, View, Dimensions, TouchableHighlight, ScrollView, FlatList} from 'react-native';
import FormContainer from './forms/FormContainer'
import PageView from './PageView'
import * as Forms from './forms/Forms'
import Colors from './forms/Colors';
import { useFonts, Comfortaa_300Light } from '@expo-google-fonts/comfortaa';

export default function App(props) {

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
    
    
};

/*
export default class App extends Component {
   
    widthAnim = new Animated.Value(50)
    widthOffsetAnim = new Animated.Value(-6)

    state = {
        selected: 5,
        completed: false,
        animationCompleted: false,
        reps: 12,
        widthAnim: this.widthAnim,
        innerWidthAnim: Animated.add(this.widthAnim, this.widthOffsetAnim)
    }


    onClick() {
        if (this.state.completed) {
            this.setState({reps: this.state.reps - 1});
        } else {
            this.setState({completed: true});
            Animated.timing(
                this.state.widthAnim,
                { 
                    toValue: 256, 
                    duration: 500,
                }
            ).start((res) => {
                this.setState({animationCompleted: true});
            });
        }
    }

    onViewableItemsChanged = ({viewableItems, changed}) => {
        this.setState({
            selected: viewableItems[2].item
        });
    };
      
    render() {


  return (
    <View>
        <NameForm />
    <View style={{margin: 50, flexDirection: 'row', width: 300, height: 44}}>
    <Animated.View style={[styles.outer_inactive, {width: this.state.widthAnim}]}>
        <TouchableHighlight activeOpacity={1.0} underlayColor='none' onPress = { () => this.onClick() }>
            <Animated.View style={[styles.inner_active, {width:  Animated.add(this.widthAnim, this.widthOffsetAnim)}]}>
                <Text style={{textAlign: "center", lineHeight: 44, textAlignVertical: 'center', color: 'white'}}>{this.state.reps}</Text>
            </Animated.View>
        </TouchableHighlight>
    </Animated.View>
    <Animated.View style={{backgroundColor: "#EEE", width: Animated.multiply(-1, Animated.add(this.widthAnim, -300)), height: 44, borderRadius: 22, borderWidth: 1, borderColor: '#E8E8E8'}}>
        <View style={this.state.completed? {display: 'none'}: {width: 250}}>
            <FlatList
                bounces={false}
                onViewableItemsChanged={this.onViewableItemsChanged}
                getItemLayout={(data, index) => (
                    { length: 50, offset: 50 * index, index }
                )}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                horizontal={true}
                style={{ flex: 1 }}
                data={['', '', 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, '', '']}
                renderItem={({item}) =>  {
                    if (item == this.state.selected) {
                        return <View style={{width: 50, height: 44, justifyContent: 'center', alignItems: 'center', flex:1}}><Text style={{textAlign: "center", color: 'black'}}>{item}</Text></View>
                    } else {
                        return <View style={{width: 50, height: 44, justifyContent: 'center', alignItems: 'center', flex:1}}><Text style={{textAlign: "center", color: '#DDD'}}>{item}</Text></View>
                    }
                }}
            />
        </View>
    </Animated.View>
    </View>
    </View>

  
  );
}
}

const styles = StyleSheet.create({
    outer_inactive: {zIndex: 1, position: 'relative', top: -4, left: -4, height: 50, borderRadius: 25, borderWidth: 1, borderColor: '#86E3CE'},
    outer_active: {zIndex: 1, position: 'relative', top: -4, left: -4, height: 50, borderRadius: 25, borderWidth: 1, borderColor: '#86E3CE'},
    inner_inactive: {position: 'relative', left: 2, top: 2, width: 44, height: 44, borderRadius: 22, backgroundColor: '#86E3CE'},
    inner_active: {position: 'relative', left: 2, top: 2, width: 300, height: 44, borderRadius: 22, backgroundColor: '#86E3CE'}
});
*/