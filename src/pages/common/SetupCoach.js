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

export default function SignupPage() {
  const {user} = useContext(UserContext);
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState(null);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView style={styles.form} behavior={'padding'}>
        <View style={styles.fieldContainer}>
          <View>
            <Text style={styles.title}>Setup Coach.</Text>
            <Text style={styles.subtitle}>
              Please create an account to get started.
            </Text>

            <ErrorMessage title={'Login Failed'} message={errorMessage} />

            <TextInput
              style={styles.textInputContainer}
              onChangeText={(text) => setEmail(text)}
              autoCorrect={false}
              placeholder={'Team Name'}
              autoCapitalize="words"
              keyboardAppearance="light"
            />
            <TextInput
              style={styles.textInputContainer}
              onChangeText={(text) => setEmail(text)}
              autoCorrect={false}
              placeholder={'Sport'}
              autoCapitalize="words"
              keyboardAppearance="light"
            />
          </View>
        </View>

        <SolidButton text={'Continue'} onPress={() => {}} />
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
