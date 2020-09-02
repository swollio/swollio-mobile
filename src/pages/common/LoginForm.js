import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, TextInput } from "react-native";

import { useNavigation } from "@react-navigation/native";
import SolidButton from "../../components/atoms/SolidButton";
import OutlinedButton from "../../components/atoms/OutlinedButton";
import ErrorMessage from "../../components/molecules/ErrorMessage";
import { UserContext } from "../../utilities/UserContext";
import { TokenContext } from "../../utilities/TokenContext";

import FormContainer from "./FormContainer";
import FormGroup from "./FormGroup";

import Colors from "../../styles/Color";
import useApi from "../../utilities/api";

import LoginStyles from "./styles/LoginStyles";

export default function LoginForm() {
  const navigation = useNavigation();
  const { token } = useContext(TokenContext);
  const { user } = useContext(UserContext);
  const { login } = useApi();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage] = useState(null);

  /*
   * If the user is logged in, redirect to the proper home page depending on
   * their account type. If the user has not setup their account, redirect\
   * them to account setup.
   */
  useEffect(() => {
    if (user && !user.athlete_id && !user.team_id) {
      navigation.navigate("AccountTypePage");
    } else if (user && user.athlete_id) {
      navigation.navigate("AthleteMainScreen");
    } else if (user && user.team_id) {
      navigation.navigate("CoachMainScreen");
    }
  }, [user]);

  /*
   * If the user has a token, but their user data has not been loaded yet,
   * display a blank page while their data loads.
   *
   * TODO: Display a loading screen.
   */
  if (token) return <></>;

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
