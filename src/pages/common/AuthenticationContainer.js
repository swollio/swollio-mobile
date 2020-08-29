import React, {useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Text, Button, View, SafeAreaView} from 'react-native';

import LoginForm from './LoginForm';
import ActionHeader from '../../components/organisms/ActionHeader';
import AthletePage from '../athlete/MainPage';
import CoachPage from '../coach/MainPage';
import WorkoutDetails from '../coach/WorkoutDetails';
import ChooseExercise from '../coach/ChooseExercise';
import * as api from '../../utilities/api';
import {useNavigation} from '@react-navigation/native';
import {UserContextProvider, UserContext} from '../../utilities/UserContext';
import {WorkoutsContextProvider} from '../../utilities/WorkoutContext';
import {AthletesContextProvider} from '../../utilities/AthletesContext';

const Stack = createStackNavigator();

function DetailsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <ActionHeader title={'Details'} />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Details Screen</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
}

function AthleteDetailsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <ActionHeader title={'Athlete Details'} />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Details Screen</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
}

function MainPage() {
  const {user} = useContext(UserContext);
  if (user === null) {
    return <View />;
  } else if (user.team_id) {
    return (
      <WorkoutsContextProvider>
        <AthletesContextProvider>
          <NavigationContainer>
            <Stack.Navigator headerMode="none">
              <Stack.Screen name="CoachMainScreen" component={CoachPage} />
              <Stack.Screen name="Details" component={DetailsScreen} />
              <Stack.Screen
                name="AthleteDetails"
                component={AthleteDetailsScreen}
              />

              <Stack.Screen name="EditWorkout" component={WorkoutDetails} />
              <Stack.Screen name="ChooseExercise" component={ChooseExercise} />
            </Stack.Navigator>
          </NavigationContainer>
        </AthletesContextProvider>
      </WorkoutsContextProvider>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="AthleteMainScreen" component={AthletePage} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default function AuthenticationContainer() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  if (!user.token) {
    return <LoginForm />;
  } else {
    return (
      <UserContextProvider>
        <MainPage />
      </UserContextProvider>
    );
  }
}
