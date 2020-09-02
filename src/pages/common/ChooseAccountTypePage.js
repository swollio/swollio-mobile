import React, { useContext, useEffect } from "react";
import { Text } from "react-native";

import { useNavigation } from "@react-navigation/native";
import OutlinedButton from "../../components/atoms/OutlinedButton";
import { UserContext } from "../../utilities/UserContext";

import FormContainer from "./FormContainer";
import FormGroup from "./FormGroup";

import LoginStyles from "./styles/LoginStyles";

export default function ChooseAccountTypePage() {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (user.athlete_id) {
      navigation.navigate("AthleteMainScreen");
    } else if (user.team_id) {
      navigation.navigate("CoachMainScreen");
    }
  }, [user, navigation]);

  return (
    <FormContainer>
      <FormGroup flex={1} justifyContent="center">
        <Text style={LoginStyles.title}>Setup Account.</Text>
        <Text style={LoginStyles.subtitle}>Are you an athlete or a coach?</Text>
      </FormGroup>
      <FormGroup flex={1} justifyContent="flex-start">
        <OutlinedButton
          text="Athlete"
          style={{ marginVertical: 8 }}
          onPress={() => navigation.navigate("SetupAthlete")}
        />
        <OutlinedButton
          text="Coach"
          style={{ marginVertical: 8 }}
          onPress={() => navigation.navigate("SetupCoach")}
        />
      </FormGroup>
    </FormContainer>
  );
}
