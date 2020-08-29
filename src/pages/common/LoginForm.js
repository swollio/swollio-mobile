import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Text,
  View,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';

import SolidButton from '../../components/atoms/SolidButton';
import OutlinedButton from '../../components/atoms/OutlinedButton';
import ErrorMessage from '../../components/molecules/ErrorMessage';

import Colors from '../../styles/Color';
import Fonts from '../../styles/Font';
import * as api from '../../utilities/api';
/**
 * The LoginForm component is a full page component that provides an interface
 * for users to enter their email and password.
 *
 * @param onLogin {(email: string, password: string) => void}
 * @param onCreateAccount {() => void}
 * @param errorMessage {string}
 */
export default function LoginForm(props) {
  // When devMode is enabled, the app should login by default to the user specified
  // in the config file.
  //if (config.devMode) props.onLogin(config.credentials);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.user.error);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView style={styles.form} behavior={'padding'}>
        <View style={styles.fieldContainer}>
          <View>
            <Text style={styles.title}>Welcome.</Text>
            <Text style={styles.subtitle}>Please login to continue</Text>

            <ErrorMessage title={'Login Failed'} message={errorMessage} />

            <View style={styles.textInputContainer}>
              <Icon size={24} name={'envelope'} />
              <TextInput
                style={styles.textInput}
                onChangeText={(text) => setEmail(text)}
                autoCorrect={false}
                placeholder={'email'}
                autoCapitalize="none"
                keyboardAppearance="light"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.textInputContainer}>
              <Icon size={24} name={'key'} />
              <TextInput
                style={styles.textInput}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                placeholder={'password'}
                autoCorrect={false}
                keyboardAppearance="light"
              />
            </View>
          </View>
        </View>

        <View style={styles.buttonGroupContainer}>
          <SolidButton
            text={'Login'}
            margin={8}
            onPress={() => {
              dispatch({type: 'LOGIN_REQUEST'});
              api
                .login(email, password)
                .then((token) => dispatch({type: 'LOGIN_SUCCESS', token}))
                .catch((err) => dispatch({type: 'LOGIN_FAILURE', err}));
            }}
          />

          <OutlinedButton
            text={'Create Account'}
            margin={8}
            onPress={() => props.onCreateAccount()}
          />
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
    paddingVertical: 8,
    borderRadius: 10,
    marginVertical: 8,
    textAlign: 'center',
    flexDirection: 'row',
  },
  form: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
  },
  fieldContainer: {
    paddingHorizontal: 36,
    justifyContent: 'center',
    width: '100%',
    flex: 1,
  },
  textInput: {flex: 1, paddingHorizontal: 8, fontSize: 16},
  buttonGroupContainer: {width: '100%', alignItems: 'center'},
});
