import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, SafeAreaView } from "react-native";

import { useNavigation } from "@react-navigation/native";
import SolidButton from "../../components/atoms/SolidButton";
import ErrorMessage from "../../components/molecules/ErrorMessage";

import Colors from "../../styles/Color";
import useApi from "../../utilities/api";

export default function SignupPage() {
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState(null);
  const [name, setName] = useState("");
  const [sport, setSport] = useState("");

  return (
    <SafeAreaView>
      <Text>Setup Team.</Text>
      <Text>Please enter your team information.</Text>

      <ErrorMessage title="Login Failed" message={errorMessage} />

      <View style={{ marginVertical: 24 }}>
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
          placeholder="Sport (optional)"
          autoCapitalize="words"
          keyboardAppearance="light"
          value={sport}
        />
      </View>

      <SolidButton text="Continue" onPress={() => {}} />
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
    borderColor: Colors.SurfaceContrast2,
    borderWidth: 1,
  },
});
