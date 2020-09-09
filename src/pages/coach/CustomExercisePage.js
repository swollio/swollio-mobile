import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, SafeAreaView } from "react-native";

import { useNavigation } from "@react-navigation/native";
import SolidButton from "../../components/atoms/SolidButton";
import ErrorMessage from "../../components/molecules/ErrorMessage";
import BubbleSelect from "../../components/organisms/BubbleSelect";
import Colors from "../../styles/Color";
import useApi from "../../utilities/api";
import ActionHeader from "../../components/organisms/ActionHeader";
import { UserContext } from "../../utilities/UserContext";

export default function SignupPage() {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const [muscles, setMuscles] = useState([]);
  const [name, setName] = useState("");
  const { createCustomExerciseForTeam, getMusclesList } = useApi();
  const musclesList = getMusclesList();
  return (
    <SafeAreaView style={{ backgroundColor: Colors.Surface, flex: 1 }}>
      <ActionHeader
        title="Create Exercise"
        onAction={() => {
          createCustomExerciseForTeam(user.team_id, {
            name: name.toLowerCase(),
            muscles,
          });
          navigation.goBack();
        }}
      />
      <View style={{ paddingHorizontal: 16 }}>
        <View style={{ marginVertical: 24 }}>
          <TextInput
            style={styles.textInputContainer}
            onChangeText={(text) => setName(text)}
            value={name}
            placeholder="Exercise Name"
            autoCorrect={false}
            autoCapitalize="none"
          />

          <BubbleSelect
            items={musclesList}
            id={(x) => x.id}
            text={(x) => x.nickname}
            onChange={(m) => setMuscles(m)}
          />
        </View>
      </View>
    </SafeAreaView>
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
