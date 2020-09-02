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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {signup} = useApi();
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (user) {
      navigation.navigate('AccountTypePage');
    }
  }, [user]);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView style={styles.form} behavior={'padding'}>
        <View style={styles.fieldContainer}>
          <View>
            <Text style={styles.title}>Welcome.</Text>
            <Text style={styles.subtitle}>
              Please create an account to get started.
            </Text>

            <ErrorMessage title={'Login Failed'} message={errorMessage} />

            <TextInput
              style={styles.textInputContainer}
              onChangeText={(text) => setFirstName(text)}
              autoCorrect={false}
              placeholder={'First Name'}
              autoCapitalize="words"
              keyboardAppearance="light"
              value={firstName}
            />
            <TextInput
              style={styles.textInputContainer}
              onChangeText={(text) => setLastName(text)}
              autoCorrect={false}
              placeholder={'Last Name'}
              autoCapitalize="words"
              keyboardAppearance="light"
              value={lastName}
            />
            <TextInput
              style={styles.textInputContainer}
              onChangeText={(text) => setEmail(text)}
              autoCorrect={false}
              placeholder={'Email'}
              autoCapitalize="none"
              keyboardAppearance="light"
              keyboardType="email-address"
              value={email}
            />
            <TextInput
              style={styles.textInputContainer}
              onChangeText={(text) => setPassword(text)}
              autoCorrect={false}
              placeholder={'Password'}
              autoCapitalize="none"
              keyboardAppearance="light"
              secureTextEntry={true}
              value={password}
            />

            <TextInput
              style={styles.textInputContainer}
              onChangeText={(text) => setConfirmPassword(text)}
              autoCorrect={false}
              placeholder={'Repeat Password'}
              autoCapitalize="none"
              keyboardAppearance="light"
              secureTextEntry={true}
              value={confirmPassword}
            />
          </View>
        </View>

        <View style={styles.buttonGroupContainer}>
          <SolidButton
            text={'Signup'}
            margin={8}
            onPress={() =>
              signup({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
              }).catch((error) => {
                setErrorMessage(error);
              })
            }
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.bodyText}>Already have an account? </Text>
            <OutlinedButton
              text="Login"
              style={{width: 'auto', height: 30, paddingHorizontal: 16}}
              onPress={() => navigation.navigate('LoginPage')}
            />
          </View>
        </View>
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
