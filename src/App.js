import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Text, Button, View, SafeAreaView, StyleSheet} from 'react-native';
import AccountTypePage from './pages/common/ChooseAccountTypePage';
import SignupPage from './pages/common/SignupPage';
import SetupAthlete from './pages/common/SetupAthlete';
import SetupCoach from './pages/common/SetupCoach';
import LoginForm from './pages/common/LoginForm';
import ActionHeader from './components/organisms/ActionHeader';
import AthletePage from './pages/athlete/MainPage';
import WorkoutPage from './pages/athlete/WorkoutPage';
import PostWorkoutSurvey from './pages/athlete/PostWorkoutSurvey';
import CoachPage from './pages/coach/MainPage';
import WorkoutDetails from './pages/coach/WorkoutDetails';
import ChooseExercise from './pages/coach/ChooseExercise';
import {useNavigation} from '@react-navigation/native';
import {UserContextProvider, UserContext} from './utilities/UserContext';
import {WorkoutsContextProvider} from './utilities/WorkoutContext';
import {AthletesContextProvider} from './utilities/AthletesContext';
import {AthleteWorkoutContextProvider} from './utilities/AthleteWorkoutContext';
import {TokenContextProvider} from './utilities/TokenContext';

const Stack = createStackNavigator();

function DetailsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeAreaBackground}>
      <ActionHeader title={'Details'} />
      <View style={styles.detailsView}>
        <Text>Details Screen</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
}

function AthleteDetailsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeAreaBackground}>
      <ActionHeader title={'Athlete Details'} />
      <View style={styles.detailsView}>
        <Text>Details Screen</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <TokenContextProvider>
      <UserContextProvider>
        <AthleteWorkoutContextProvider></AthleteWorkoutContextProvider>
        <WorkoutsContextProvider>
          <AthletesContextProvider>
            <NavigationContainer>
              <Stack.Navigator headerMode="none" initialRouteName="LoginPage">
                <Stack.Screen name="LoginPage" component={LoginForm} />
                <Stack.Screen name="SignupPage" component={SignupPage} />
                <Stack.Screen name="SetupAthlete" component={SetupAthlete} />
                <Stack.Screen name="SetupCoach" component={SetupCoach} />

                <Stack.Screen
                  name="AccountTypePage"
                  component={AccountTypePage}
                />
                <Stack.Screen
                  name="AthleteMainScreen"
                  component={AthletePage}
                />
                <Stack.Screen name="Details" component={DetailsScreen} />
                <Stack.Screen name="WorkoutPage" component={WorkoutPage} />
                <Stack.Screen
                  name="PostWorkoutSurvey"
                  component={PostWorkoutSurvey}
                />

                <Stack.Screen name="CoachMainScreen" component={CoachPage} />
                <Stack.Screen
                  name="AthleteDetails"
                  component={AthleteDetailsScreen}
                />

                <Stack.Screen name="EditWorkout" component={WorkoutDetails} />
                <Stack.Screen
                  name="ChooseExercise"
                  component={ChooseExercise}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </AthletesContextProvider>
        </WorkoutsContextProvider>
      </UserContextProvider>
    </TokenContextProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaBackground: {
    backgroundColor: 'white',
  },
  detailsView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
