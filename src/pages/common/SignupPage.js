import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import SolidButton from "../../components/atoms/SolidButton";
import ErrorMessage from "../../components/molecules/ErrorMessage";
import { UserContext } from "../../utilities/UserContext";

import FormContainer from "./FormContainer";
import FormGroup from "./FormGroup";

import Font from "../../styles/Font";
import Colors from "../../styles/Color";
import useApi from "../../utilities/api";

import LoginStyles from "./styles/LoginStyles";

function LinkText({ onPress, children }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={{
          fontFamily: Font.Body,
          color: Colors.SurfaceContrast,
          fontSize: 16,
          textDecorationLine: "underline",
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

export default function SignupPage() {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const { signup } = useApi();
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (user) {
      navigation.navigate("AccountTypePage");
    }
  }, [user]);

  return (
    <FormContainer>
      <Text style={LoginStyles.title}>Welcome.</Text>
      <Text style={LoginStyles.subtitle}>
        Please create an account to get started.
      </Text>

      <ErrorMessage title="Login Failed" message={errorMessage} />

      <View style={{ marginVertical: 16 }}>
        <TextInput
          style={[
            styles.textInputContainer,
            firstNameError && { borderColor: Colors.Error },
          ]}
          onChangeText={(text) => setFirstName(text)}
          autoCorrect={false}
          placeholder="First Name"
          onBlur={() => setFirstNameError(firstName.length === 0)}
          autoCapitalize="words"
          value={firstName}
        />
        <TextInput
          style={[
            styles.textInputContainer,
            lastNameError && { borderColor: Colors.Error },
          ]}
          onChangeText={(text) => setLastName(text)}
          autoCorrect={false}
          placeholder="Last Name"
          autoCapitalize="words"
          onBlur={() => setLastNameError(lastName.length === 0)}
          value={lastName}
        />
        <TextInput
          style={[
            styles.textInputContainer,
            emailError && { borderColor: Colors.Error },
          ]}
          onChangeText={(text) => setEmail(text)}
          autoCorrect={false}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          onBlur={() =>
            setEmailError(
              !RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$").test(
                email
              )
            )
          }
          value={email}
        />
        <TextInput
          style={[
            styles.textInputContainer,
            passwordError && { borderColor: Colors.Error },
          ]}
          onBlur={() => setPasswordError(password.length === 0)}
          onChangeText={(text) => setPassword(text)}
          autoCorrect={false}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry
          value={password}
        />

        <TextInput
          style={[
            styles.textInputContainer,
            confirmPasswordError && { borderColor: Colors.Error },
          ]}
          onChangeText={(text) => setConfirmPassword(text)}
          autoCorrect={false}
          placeholder="Repeat Password"
          autoCapitalize="none"
          onBlur={() => setConfirmPasswordError(password !== confirmPassword)}
          secureTextEntry
          value={confirmPassword}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 24,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: Font.Body,
            fontSize: 16,
            fontWeight: "300",
            textAlign: "center",
            color: Colors.SurfaceContrast2,
          }}
        >
          By signing up, you agree to Swollio's Privacy Policy and Terms of Use
        </Text>
      </View>

      <SolidButton
        text="Signup"
        margin={8}
        onPress={() =>
          signup({
            first_name: firstName,
            last_name: lastName,
            email,
            password,
          })
            .then(() => {
              setFirstName("");
              setFirstNameError(false);
              setLastName("");
              setLastNameError(false);
              setEmail("");
              setEmailError(false);
              setPassword("");
              setPasswordError(false);
              setConfirmPassword("");
              setConfirmPasswordError(false);
            })
            .catch((error) => setErrorMessage(error.message))
        }
      />
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 24,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: Font.Body,
            fontSize: 16,
            paddingHorizontal: 8,
            color: Colors.SurfaceContrast2,
          }}
        >
          Already a member?
        </Text>

        <LinkText onPress={() => navigation.navigate("LoginPage")}>
          Login
        </LinkText>
      </View>
    </FormContainer>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    color: Colors.SurfaceContrast,
    paddingHorizontal: 16,
    fontSize: 16,
    paddingVertical: 16,
    borderRadius: 6,
    marginVertical: 8,
    flexDirection: "row",
    borderColor: Colors.SurfaceContrast,
    borderWidth: 1,
  },
});
