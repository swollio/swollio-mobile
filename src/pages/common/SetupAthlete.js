import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import {useNavigation, Link} from '@react-navigation/native';
import SolidButton from '../../components/atoms/SolidButton';
import OutlinedButton from '../../components/atoms/OutlinedButton';
import ErrorMessage from '../../components/molecules/ErrorMessage';
import {UserContext} from '../../utilities/UserContext';
import Colors from '../../styles/Color';
import Fonts from '../../styles/Font';
import Icon from 'react-native-vector-icons/FontAwesome5';
import useApi from '../../utilities/api';

export default function SignupPage() {
  const {user} = useContext(UserContext);
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState(null);
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const {createAthlete} = useApi();

  useEffect(() => {
    if (user.athlete_id) {
      navigation.navigate('AthleteMainScreen');
    }
  }, [user]);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView style={styles.form} behavior={'padding'}>
        <View style={styles.fieldContainer}>
          <View>
            <Text style={styles.title}>Setup Athlete.</Text>
            <Text style={styles.subtitle}>
              Please create an account to get started.
            </Text>

            <ErrorMessage title={'Login Failed'} message={errorMessage} />

            <TextInput
              style={styles.textInputContainer}
              onChangeText={(text) => setAge(text)}
              autoCorrect={false}
              placeholder={'Age'}
              keyboardAppearance="light"
              keyboardType="numeric"
              value={age}
            />
            <TextInput
              style={styles.textInputContainer}
              onChangeText={(text) => setHeight(text)}
              autoCorrect={false}
              placeholder={'Height'}
              keyboardAppearance="light"
              keyboardType="numeric"
              value={height}
            />
            <TextInput
              style={styles.textInputContainer}
              onChangeText={(text) => setWeight(text)}
              autoCorrect={false}
              placeholder={'Weight'}
              keyboardAppearance="light"
              keyboardType="numeric"
              value={weight}
            />
            <TextInput
              style={styles.textInputContainer}
              onChangeText={(text) => setGender(text)}
              autoCorrect={false}
              placeholder={'Gender'}
              autoCapitalize="none"
              keyboardAppearance="light"
              value={gender}
            />
          </View>
        </View>

        <SolidButton
          text={'Continue'}
          onPress={() =>
            createAthlete({
              age,
              height,
              weight,
              gender,
              user_id: user.user_id,
            })
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    maxWidth: '80%',
    fontFamily: Fonts.Header,
    color: Colors.SurfaceContrast,
    textAlign: 'left',
    width: '100%',
  },
  subtitle: {
    fontSize: 18,
    maxWidth: '80%',
    fontFamily: Fonts.Header,
    color: Colors.SurfaceContrast2,
    textAlign: 'left',
    width: '100%',
    marginVertical: 8,
  },
  textInputContainer: {
    color: Colors.SurfaceContrast,
    backgroundColor: Colors.Background,
    paddingHorizontal: 16,
    fontSize: 16,
    paddingVertical: 16,
    borderRadius: 6,
    marginVertical: 8,
    flexDirection: 'row',
    borderColor: Colors.SurfaceContrast2,
    borderWidth: 1,
  },
  bodyText: {
    fontSize: 16,
    marginVertical: 16,
  },
  form: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
  },
  fieldContainer: {
    paddingHorizontal: 24,
    justifyContent: 'center',
    width: '100%',
    flex: 1,
  },
  textInput: {flex: 1, paddingHorizontal: 8, fontSize: 16},
  buttonGroupContainer: {width: '100%', alignItems: 'center'},
});
