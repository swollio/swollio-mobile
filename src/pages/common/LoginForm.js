import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from "react-native";

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
import LoadingView from "../../components/molecules/LoadingView";
import Font from "../../styles/Font";

function Link({ onPress, children }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={{
          fontFamily: Font.Body,
          fontSize: 16,
          textDecorationLine: "underline",
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

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
  if (token)
    return (
      <FormContainer>
        <LoadingView />
      </FormContainer>
    );

  return (
    <FormContainer>
      <Text style={LoginStyles.title}>Hello.</Text>
      <Text style={LoginStyles.subtitle}>Please login to continue</Text>

      <View style={{ marginVertical: 16 }}>
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
          By logging in, you agree to Swollio's Privacy Policy and Terms of Use
        </Text>
      </View>

      <SolidButton text="Login" onPress={() => login(email, password)} />

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
          Not a member?
        </Text>

        <Link onPress={() => navigation.navigate("SignupPage")}>
          Create Account
        </Link>
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
    borderColor: Colors.SurfaceContrast2,
    borderWidth: 1,
  },
});
