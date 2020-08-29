import * as React from 'react';
import {Text, Button, View, SafeAreaView} from 'react-native';

import RootHeader from '../../components/organisms/RootHeader';
import {useNavigation} from '@react-navigation/native';

import TabPageStyles from '../styles/TabPage';
import * as api from '../../utilities/api';
export default function AthleteWorkoutsScreen() {
  const navigation = useNavigation();

  api.getWorkoutsForAthlete(1).then((workouts) => {
    console.log(workouts);
  });
  return (
    <SafeAreaView style={TabPageStyles.pageContainer}>
      <RootHeader title={'Workouts.'} />
      <View style={TabPageStyles.pageMain}>
        <Text>AthleteWorkoutsScreen</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    </SafeAreaView>
  );
}
