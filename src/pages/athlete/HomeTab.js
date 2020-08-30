import React, {useContext} from 'react';
import {Text, Button, View, SafeAreaView} from 'react-native';
import {UserContext} from '../../utilities/UserContext';

import RootHeader from '../../components/organisms/RootHeader';

import TabPageStyles from '../styles/TabPage';
import {useNavigation} from '@react-navigation/native';
import LoadingPage from '../LoadingPage';

export default function AthleteHomeScreen() {
  const {user} = useContext(UserContext);
  const navigation = useNavigation();

  if (!user) {
    return <LoadingPage />;
  } else {
    return (
      <SafeAreaView style={TabPageStyles.pageContainer}>
        <RootHeader title={`Welcome ${user.first_name}.`} />
        <View style={TabPageStyles.pageMain}>
          <Text>Athlete Home Screen</Text>
          <Button
            title="Go to Details"
            onPress={() => navigation.navigate('Details')}
          />
        </View>
      </SafeAreaView>
    );
  }
}
