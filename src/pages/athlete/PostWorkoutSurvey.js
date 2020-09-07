import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../styles/Color";
import ButtonRow from "../../components/molecules/ButtonRow";
import ScrollPicker from "../../components/molecules/ScrollPicker";
import SolidButton from "../../components/atoms/SolidButton";
import useApi from "../../utilities/api";
import { UserContext } from "../../utilities/UserContext";
import headerStyles from "../../components/organisms/styles/Header";
import Font from "../../styles/Font";

/**
 * This function creates a form with a post workout questionnaire
 * and posts that form after it is submitted.
 *
 * @param {*} props Props for this function
 */
export default function PostWorkoutSurvey(props) {
  const [workoutRating, setWorkoutRating] = useState(-1);
  const [hoursSleep, setHoursSleep] = useState(6);
  const [wellnessVal, setWellnessVal] = useState(-1);
  const { user } = useContext(UserContext);
  const navigation = useNavigation();
  const { postPostWorkoutSurvey } = useApi();

  return (
    <View style={[headerStyles.container, styles.flex]}>
      <SafeAreaView style={headerStyles.safeAreaTop} />

      <View
        style={[
          headerStyles.container,
          headerStyles.header,
          styles.headerStyle,
        ]}
      >
        <Text style={headerStyles.title}>Post Workout Survey</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.question}>Rate this workout: </Text>
        <ButtonRow
          style={styles.toggleButton}
          buttons={["Too Easy", "Just Right", "Too Hard"]}
          onChange={(val) => setWorkoutRating(val)}
        />
        <Text style={styles.question}>
          How many hours of sleep did you get?
        </Text>
        <ScrollPicker
          style={styles.scrollPicker}
          field="hours_sleep"
          selectColor={Colors.Primary}
          data={[...Array(12).keys(), "12+"]}
          initialValue={6}
          onChange={(i) => setHoursSleep(i)}
        />
        <Text style={styles.question}>
          Please rank how you are feeling today:
        </Text>
        <ButtonRow
          style={styles.toggleButton}
          buttons={[1, 2, 3, 4, 5]}
          onChange={(val) => setWellnessVal(val)}
        />
      </View>

      <View style={styles.buttonView}>
        <SolidButton
          style={styles.button}
          onPress={() => {
            if (user.athlete_id === null) {
              return;
            }
            postPostWorkoutSurvey(user.athlete_id, props.route.params.id, {
              due_date: props.route.params.date,
              rating: workoutRating,
              hours_sleep: hoursSleep,
              wellness: wellnessVal,
            }).then(() => navigation.navigate("AthleteMainScreen"));
          }}
          text="Finish Workout"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeAreaTop: {
    flex: 0,
    backgroundColor: Colors.Primary,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: Colors.Primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 24,
    color: Colors.PrimaryContrast,
    fontFamily: Font.Header,
    textAlign: "left",
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  form: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  question: {
    fontSize: 22,
    fontFamily: Font.Body,
    textAlign: "left",
    width: "100%",
  },
  headerIcon: {
    fontSize: 30,
    color: Colors.PrimaryContrast,
  },
  toggleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginRight: 8,
    marginLeft: 8,
  },
  scrollPicker: {
    marginTop: 20,
    marginBottom: 20,
    borderColor: Colors.Primary,
    borderWidth: 1,
    borderRadius: 30,
  },
  buttonView: {
    alignItems: "center",
    marginBottom: 150,
  },
  button: {
    backgroundColor: Colors.Primary,
    height: 50,
  },
  buttonText: {
    color: Colors.PrimaryContrast,
    fontSize: 22,
  },
  flex: {
    flex: 1,
  },
});
