import React, { useState, useEffect } from "react";
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

import useApi from "../../utilities/api";

import ActionHeader from "../../components/organisms/ActionHeader";

import Colors from "../../styles/Color";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <View style={searchBarStyles.searchBarContainer}>
      <View style={searchBarStyles.searchBarIconContainer}>
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
  );
}

const searchBarStyles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: "row",
    backgroundColor: Colors.Background,
    borderRadius: 25,
    overflow: "hidden",
    margin: 16,
  },
  searchBarIconContainer: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
  },
});

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
        backgroundColor: Colors.Surface,
        width: "100%",
      }}
    >
      <ActionHeader
        title="Create Custom"
        onAction={() => navigation.navigate("CustomExercisePage")}
        pop={() => navigation.goBack()}
      />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ScrollView style={{ flex: 1, backgroundColor: Colors.Surface }}>
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
            <Icon name="plus" size={20} color={Colors.Primary} />
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
