import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";
import Colors from "../../styles/Color";
import useApi from "../../utilities/api";
import ActionHeader from "../../components/organisms/ActionHeader";

export default function SelectExercise({ navigation, route }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { searchExercisesByName } = useApi();
  const [createCustom, setCreateCustom] = useState(false);

  useEffect(() => {
    searchExercisesByName(searchTerm).then((data) => {
      setSearchResults(data);
    });
  }, [searchTerm]);

  if (createCustom) {
    return <View />;
    /* return (
      <CreateCustomExercise
        team_id={props.user.team_id}
        onCancel={props.onCancel}
        onCreate={(exercise) => props.onSelect(exercise)}
      />
    ); */
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.PrimaryContrast,
        width: "100%",
      }}
    >
      <ActionHeader
        title="Create Custom"
        onAction={() => setCreateCustom(true)}
        pop={() => navigation.goBack()}
      />
      <View style={{ flexDirection: "column", paddingHorizontal: 16 }}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: Colors.Background,
            borderRadius: 25,
            width: "100%",
            overflow: "hidden",
            marginVertical: 8,
          }}
        >
          <View
            style={{
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              width: 50,
            }}
          />
          <Icon name="search" size={24} color={Colors.SurfaceContrast2} />
        </View>
        <TextInput
          height={50}
          style={{ padding: 8, height: 50, flex: 1 }}
          onChangeText={(text) => setSearchTerm(text)}
          placeholder="Search for exercises"
          value={searchTerm}
        />
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: Colors.PrimaryContrast }}>
        {searchResults.map((exercise) => (
          <TouchableOpacity
            onPress={() => {
              route.params.onChoose(exercise);
              navigation.goBack();
            }}
            key={exercise.id}
            style={styles.section}
          >
            <Text style={styles.content}>{exercise.name}</Text>
            <Icon name="plus" size={24} color={Colors.Primary} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  section: {
    borderColor: Colors.SurfaceContrast2,
    borderBottomWidth: 1,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  content: {
    color: Colors.BackgroundContrast,
  },
});
