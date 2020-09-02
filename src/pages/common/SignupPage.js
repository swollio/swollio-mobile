import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, TextInput } from "react-native";

import { useNavigation } from "@react-navigation/native";
import SolidButton from "../../components/atoms/SolidButton";
import OutlinedButton from "../../components/atoms/OutlinedButton";
import ErrorMessage from "../../components/molecules/ErrorMessage";
import { UserContext } from "../../utilities/UserContext";

import FormContainer from "./FormContainer";
import FormGroup from "./FormGroup";

import Colors from "../../styles/Color";
import useApi from "../../utilities/api";

import LoginStyles from "./styles/LoginStyles";

export default function SignupPage() {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup } = useApi();
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (user) {
      navigation.navigate("AccountTypePage");
    }
  }, [user]);

  return (
    <FormContainer>
      <FormGroup flex={1} justifyContent="center">
        <Text style={LoginStyles.title}>Welcome.</Text>
        <Text style={LoginStyles.subtitle}>
          Please create an account to get started.
        </Text>

        <ErrorMessage title="Login Failed" message={errorMessage} />

        <TextInput
          style={styles.textInputContainer}
          onChangeText={(text) => setFirstName(text)}
          autoCorrect={false}
          placeholder="First Name"
          autoCapitalize="words"
          keyboardAppearance="light"
          value={firstName}
        />
        <TextInput
          style={styles.textInputContainer}
          onChangeText={(text) => setLastName(text)}
          autoCorrect={false}
          placeholder="Last Name"
          autoCapitalize="words"
          keyboardAppearance="light"
          value={lastName}
        />
        <TextInput
          style={styles.textInputContainer}
          onChangeText={(text) => setEmail(text)}
          autoCorrect={false}
          placeholder="Email"
          autoCapitalize="none"
          keyboardAppearance="light"
          keyboardType="email-address"
          value={email}
        />
        <TextInput
          style={styles.textInputContainer}
          onChangeText={(text) => setPassword(text)}
          autoCorrect={false}
          placeholder="Password"
          autoCapitalize="none"
          keyboardAppearance="light"
          secureTextEntry
          value={password}
        />

        <TextInput
          style={styles.textInputContainer}
          onChangeText={(text) => setConfirmPassword(text)}
          autoCorrect={false}
          placeholder="Repeat Password"
          autoCapitalize="none"
          keyboardAppearance="light"
          secureTextEntry
          value={confirmPassword}
        />
      </FormGroup>

      <FormGroup>
        <SolidButton
          text="Signup"
          margin={8}
          onPress={() =>
            signup({
              first_name: firstName,
              last_name: lastName,
              email,
              password,
            }).catch((error) => setErrorMessage(error))}
        />
        <OutlinedButton
          text="Login"
          margin={8}
          onPress={() => navigation.navigate("LoginPage")}
        />
      </FormGroup>
    </FormContainer>
  );
}

const styles = StyleSheet.create({
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
});
