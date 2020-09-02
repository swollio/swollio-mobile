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
  const { user, refreshUser } = useContext(UserContext);
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState(null);
  const [name, setName] = useState("");
  const [sport, setSport] = useState("");
  const { createTeam } = useApi();

  useEffect(() => {
    if (user.team_id) {
      navigation.navigate("CoachMainScreen");
    }
  }, [user]);

  return (
    <FormContainer>
      <FormGroup flex={1} justifyContent="center">
        <Text style={LoginStyles.title}>Setup Coach.</Text>
        <Text style={LoginStyles.subtitle}>
          Please create an account to get started.
        </Text>

        <ErrorMessage title="Login Failed" message={errorMessage} />

        <TextInput
          style={styles.textInputContainer}
          onChangeText={(text) => setName(text)}
          autoCorrect={false}
          placeholder="Team Name"
          autoCapitalize="words"
          keyboardAppearance="light"
          value={name}
        />
        <TextInput
          style={styles.textInputContainer}
          onChangeText={(text) => setSport(text)}
          autoCorrect={false}
          placeholder="Sport"
          autoCapitalize="words"
          keyboardAppearance="light"
          value={sport}
        />
      </FormGroup>
      <FormGroup>
        <SolidButton
          text="Continue"
          onPress={() =>
            createTeam({
              name,
              sport,
            }).then(() => refreshUser())
          }
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
