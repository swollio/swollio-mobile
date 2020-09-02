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
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const { createAthlete } = useApi();

  useEffect(() => {
    if (user.athlete_id) {
      navigation.navigate("AthleteMainScreen");
    }
  }, [user]);

  return (
    <FormContainer>
      <FormGroup flex={1} justifyContent="center">
        <Text style={LoginStyles.title}>Setup Athlete.</Text>
        <Text style={LoginStyles.subtitle}>
          Please create an account to get started.
        </Text>

        <ErrorMessage title="Login Failed" message={errorMessage} />

        <TextInput
          style={styles.textInputContainer}
          onChangeText={(text) => setAge(text)}
          autoCorrect={false}
          placeholder="Age"
          keyboardAppearance="light"
          keyboardType="numeric"
          value={age}
        />
        <TextInput
          style={styles.textInputContainer}
          onChangeText={(text) => setHeight(text)}
          autoCorrect={false}
          placeholder="Height"
          keyboardAppearance="light"
          keyboardType="numeric"
          value={height}
        />
        <TextInput
          style={styles.textInputContainer}
          onChangeText={(text) => setWeight(text)}
          autoCorrect={false}
          placeholder="Weight"
          keyboardAppearance="light"
          keyboardType="numeric"
          value={weight}
        />
        <TextInput
          style={styles.textInputContainer}
          onChangeText={(text) => setGender(text)}
          autoCorrect={false}
          placeholder="Gender"
          autoCapitalize="none"
          keyboardAppearance="light"
          value={gender}
        />
      </FormGroup>
      <FormGroup>
        <SolidButton
          text="Continue"
          onPress={() =>
            createAthlete({
              age,
              height,
              weight,
              gender,
              user_id: user.user_id,
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
