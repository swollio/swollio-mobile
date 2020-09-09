import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import SolidButton from "../../components/atoms/SolidButton";
import ErrorMessage from "../../components/molecules/ErrorMessage";
import { UserContext } from "../../utilities/UserContext";

import FormContainer from "./FormContainer";

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
      <Text style={LoginStyles.title}>Setup Team.</Text>
      <Text style={LoginStyles.subtitle}>
        Please enter your team information.
      </Text>

      <ErrorMessage title="Login Failed" message={errorMessage} />

      <View style={{ marginVertical: 24 }}>
        <TextInput
          style={styles.textInputContainer}
          onChangeText={(text) => setName(text)}
          autoCorrect={false}
          placeholder="Team Name"
          autoCapitalize="words"
          value={name}
        />
        <TextInput
          style={styles.textInputContainer}
          onChangeText={(text) => setSport(text)}
          autoCorrect={false}
          placeholder="Sport (optional)"
          autoCapitalize="words"
          value={sport}
        />
      </View>

      <SolidButton
        text="Continue"
        onPress={() =>
          createTeam({
            name,
            sport,
          })
            .then(() => refreshUser())
            .catch((error) => setErrorMessage(error.message))
        }
      />
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
