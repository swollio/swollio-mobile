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

export default function LoginForm() {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const { login } = useApi();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage] = useState(null);

  useEffect(() => {
    if (user) {
      navigation.navigate("AccountTypePage");
    }
  }, [user]);

  return (
    <FormContainer>
      <FormGroup flex={1} justifyContent="center">
        <Text style={LoginStyles.title}>Hello.</Text>
        <Text style={LoginStyles.subtitle}>Please login to continue</Text>
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
      </FormGroup>

      <FormGroup>
        <SolidButton
          text="Login"
          margin={8}
          onPress={() => login(email, password)}
        />

        <OutlinedButton
          text="Create Account"
          margin={8}
          onPress={() => navigation.navigate("SignupPage")}
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
