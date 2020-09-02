import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Text,
  View,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import { useNavigation, Link } from "@react-navigation/native";
import SolidButton from "../../components/atoms/SolidButton";
import OutlinedButton from "../../components/atoms/OutlinedButton";
import ErrorMessage from "../../components/molecules/ErrorMessage";
import { UserContext } from "../../utilities/UserContext";

import Colors from "../../styles/Color";
import Fonts from "../../styles/Font";
import useApi from "../../utilities/api";

export default function LoginForm(props) {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const { login } = useApi();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (user) {
      navigation.navigate("AccountTypePage");
    }
  }, [user]);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView style={styles.form} behavior="padding">
        <View style={styles.fieldContainer}>
          <View>
            <Text style={styles.title}>Hello.</Text>
            <Text style={styles.subtitle}>Please login to continue</Text>

            <ErrorMessage title="Login Failed" message={errorMessage} />

            <TextInput
              style={styles.textInputContainer}
              onChangeText={(text) => setEmail(text)}
              autoCorrect={false}
              placeholder="Email"
              autoCapitalize="none"
              keyboardAppearance="light"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.textInputContainer}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
              placeholder="Password"
              autoCorrect={false}
              keyboardAppearance="light"
            />
          </View>
        </View>

        <View style={styles.buttonGroupContainer}>
          <SolidButton
            text="Login"
            margin={8}
            onPress={() => {
              login(email, password);
            }}
          />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.bodyText}>Don't have an account? </Text>
            <OutlinedButton
              text="Signup"
              style={{ width: "auto", height: 30, paddingHorizontal: 16 }}
              onPress={() => navigation.navigate("SignupPage")}
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
    maxWidth: "80%",
    fontFamily: Fonts.Header,
    color: Colors.SurfaceContrast,
    textAlign: "left",
    width: "100%",
  },
  subtitle: {
    fontSize: 18,
    maxWidth: "80%",
    fontFamily: Fonts.Header,
    color: Colors.SurfaceContrast2,
    textAlign: "left",
    width: "100%",
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
    flexDirection: "row",
    borderColor: Colors.SurfaceContrast2,
    borderWidth: 1,
  },
  form: {
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
  },
  bodyText: {
    fontSize: 16,
    marginVertical: 16,
  },
  fieldContainer: {
    paddingHorizontal: 24,
    justifyContent: "center",
    width: "100%",
    flex: 1,
  },
  textInput: { flex: 1, paddingHorizontal: 8, fontSize: 16 },
  buttonGroupContainer: { width: "100%", alignItems: "center" },
});
