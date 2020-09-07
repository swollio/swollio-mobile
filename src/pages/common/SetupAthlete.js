import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

import { useNavigation } from "@react-navigation/native";
import SolidButton from "../../components/atoms/SolidButton";
import ErrorMessage from "../../components/molecules/ErrorMessage";
import { UserContext } from "../../utilities/UserContext";
import ButtonRow from "../../components/molecules/ButtonRow";
import FormContainer from "./FormContainer";
import FormGroup from "./FormGroup";

import Colors from "../../styles/Color";
import useApi from "../../utilities/api";

import LoginStyles from "./styles/LoginStyles";

export default function SignupPage() {
  const { user, refreshUser } = useContext(UserContext);
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState(null);
  const [age, setAge] = useState(null);
  const [heightFeet, setHeightFeet] = useState(null);
  const [heightInches, setHeightInches] = useState(null);
  const [weight, setWeight] = useState(null);
  const [gender, setGender] = useState(null);
  const { createAthlete } = useApi();

  useEffect(() => {
    if (user.athlete_id) {
      navigation.navigate("AthleteMainScreen");
    }
  }, [user]);

  return (
    <FormContainer>
      <Text style={LoginStyles.title}>Setup Athlete.</Text>
      <Text style={LoginStyles.subtitle}>
        Please create an account to get started.
      </Text>

      <ErrorMessage title="Login Failed" message={errorMessage} />

      <View style={{ marginVertical: 24 }}>
        <TextInput
          style={styles.textInputContainer}
          onChangeText={(text) => setAge(Number.parseInt(text, 10))}
          autoCorrect={false}
          placeholder="Age (years)"
          keyboardAppearance="light"
          keyboardType="numeric"
          value={age ? age.toString() : ""}
        />
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={[styles.textInputContainer, { marginRight: 8, flex: 1 }]}
            onChangeText={(text) => setHeightFeet(Number.parseInt(text, 10))}
            autoCorrect={false}
            placeholder="Height (feet)"
            keyboardAppearance="light"
            keyboardType="numeric"
            value={heightFeet ? heightFeet.toString() : ""}
          />
          <TextInput
            style={[styles.textInputContainer, { marginLeft: 8, flex: 1 }]}
            onChangeText={(text) => setHeightInches(Number.parseInt(text, 10))}
            autoCorrect={false}
            placeholder="Height (inches)"
            keyboardAppearance="light"
            keyboardType="numeric"
            value={heightInches ? heightInches.toString() : ""}
          />
        </View>

        <TextInput
          style={styles.textInputContainer}
          onChangeText={(text) => setWeight(Number.parseInt(text, 10))}
          autoCorrect={false}
          placeholder="Weight (lbs)"
          keyboardAppearance="light"
          keyboardType="numeric"
          value={weight ? weight.toString() : ""}
        />
        <ButtonRow
          onChange={(value) => setGender(value)}
          buttons={["male", "female"]}
        />
      </View>
      <SolidButton
        text="Continue"
        onPress={() =>
          createAthlete({
            age,
            height: heightFeet * 12 + heightInches,
            weight,
            gender,
            user_id: user.user_id,
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
    borderColor: Colors.SurfaceContrast2,
    borderWidth: 1,
  },
});
