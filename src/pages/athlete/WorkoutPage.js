import React, {useState, useContext, useEffect} from "react";
import {StyleSheet, Text, View, ScrollView, SafeAreaView} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Colors from "../../styles/Color";
import Icon from "react-native-vector-icons/FontAwesome5";
import useApi from "../../utilities/api";
import WorkoutCard from "../../components/organisms/WorkoutCard";
import LoadingPage from "../LoadingPage";
import WaterMark from "../../components/organisms/WaterMark";
import OutlinedButton from "../../components/atoms/SolidButton";
import headerStyles from "../../components/organisms/styles/Header";
import {UserContext} from "../../utilities/UserContext";

/**
 * Header is the header component for the Athlete Workout Page.
 * It contains a back button as well as a check button to mark the
 * workout as completed.
 *
 * @param setComplete
 */
function Header(props) {
    const navigation = useNavigation();
    return (
        <View
            style={[headerStyles.container, headerStyles.header, styles.headerStyle]}>
            <Icon
                name={"arrow-left"}
                style={headerStyles.text}
                size={24}
                onPress={() => navigation.goBack()}
            />
            <Text style={headerStyles.title}>Workout</Text>
            <Icon
                name={"check"}
                style={headerStyles.text}
                size={24}
                onPress={() => props.setComplete(true)}
            />
        </View>
    );
}

/**
 * WorkoutCompleteConfirmation informs the user that their workout is
 * complete, and asks them to confirm that they wish to complete the workout.
 * @param {*} props
 */
function WorkoutCompleteConfirmation(props) {
    const {user} = useContext(UserContext);
    const navigation = useNavigation();
    const {postAthleteWorkoutResult} = useApi();

    return (
        <SafeAreaView style={styles.safeAreaHeader}>
            <Icon
                name={"arrow-left"}
                style={[headerStyles.text, styles.headerIcon]}
                size={36}
                onPress={() => props.setComplete(false)}
            />
            <View style={styles.completeView}>
                <Text style={[headerStyles.title, styles.completeText]}>
          Workout Complete!
                </Text>
                <Text style={[headerStyles.subtitle, styles.completeText]}>
          Once you proceed, you will be not be able to make any changes.
                </Text>
                <Text style={[headerStyles.subtitle, styles.completeSubText]}>
          If you are done, press submit and continue on to the post-workout
          survey.
                </Text>

                <OutlinedButton
                    text={"Submit Workout"}
                    onPress={() => {
                        if (user.athlete_id === null) {
                            return;
                        }
                        postAthleteWorkoutResult(
                            user.athlete_id,
                            props.workout_id,
                            props.results.flat().filter((x) => x.created !== null),
                        ).then(() => {
                            navigation.navigate("PostWorkoutSurvey", {
                                date: props.date,
                                id: props.workout_id,
                            });
                        });
                    }}
                />
            </View>
        </SafeAreaView>
    );
}

/**
 * The WorkoutPage component is the root level container which displays
 * a list of exercise assignments to be completed be the user. Additionally,
 * It stores the current state of the workout progress. Upon workout completion,
 * it sends the results of the workout to the server.
 */
export default function WorkoutPage(props) {
    // The list of assignments to be completed by the athlete
    const assignments = props.route.params.assignments;
    /*
   * Results stores a 2D array of workout_results.
   * The outer array groups results by exercise.
   * The inner array stores the result from an individual set.
   * The reason for storing it in this manner is to easily pass
   * the results for a single exercise to a workout card.
   */
    const [results, setResults] = useState(null);
    const [complete, setComplete] = useState(false);
    const defaultWeight = 60;

    // Load the list of assignments
    useEffect(() => {
        if (!assignments) {
            return;
        }
        // Outer map traverses by assignment (so each inner array will have the same exercise_id)
        setResults(
            assignments.map((assignment) =>
            // Since there are rep_count.length number of reps, we are going to
            // make each element of the inner array an object that defaults to
            // the rep_count as that index, a default weight, and the exercise id
                assignment.rep_count.map((reps) => ({
                    // These fields are constant and will never be changed by the athlete
                    assignment_id: assignment.id,
                    exercise_id: assignment.exercise.id,
                    initalReps: reps,
                    date: props.route.params.date,

                    // These fields will be changed by the athlete as they complete the workout
                    reps: reps,
                    weight: defaultWeight,
                    created: null,
                })),
            ),
        );
    }, [assignments, props.route.params.date]);

    return (
        (complete && (
            <WorkoutCompleteConfirmation
                workout_id={props.route.params.workout_id}
                date={props.route.params.date}
                workout={props.workout}
                results={results}
                setComplete={(b) => setComplete(b)}
            />
        )) || (
            <View style={styles.workoutBackground}>
                <SafeAreaView style={headerStyles.safeAreaTop} />
                <Header setComplete={(b) => setComplete(b)} />
                {(assignments === null && <LoadingPage />) ||
          (assignments.length === 0 && (
              <WaterMark title={"No Assignments"} />
          )) || (
                    <ScrollView padding={10} style={styles.flex}>
                        {assignments.map((assignment, index) => (
                            <WorkoutCard
                                key={index}
                                exercise_id={assignment.exercise.id}
                                results={results === null ? null : results[index]}
                                onChange={(resultObj) => {
                                    if (!results) {
                                        return;
                                    }
                                    results[index] = resultObj;
                                    setResults([...results]);
                                }}
                                selectColor={Colors.Primary}
                                barColor={Colors.Primary}
                                title={assignment.exercise.name}
                            />
                        ))}
                    </ScrollView>
                )}
            </View>
        )
    );
}

const styles = StyleSheet.create({
    headerStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    safeAreaHeader: {
        height: "100%",
        backgroundColor: Colors.Surface,
    },
    workoutBackground: {
        height: "100%",
        backgroundColor: Colors.Background,
    },
    completeView: {
        alignItems: "center",
        justifyContent: "center",
        flex: 0.9,
    },
    completeText: {
        textAlign: "center",
        marginBottom: 24,
    },
    completeSubText: {
        textAlign: "center",
        marginBottom: 36,
    },
    flex: {
        flex: 1,
    },
    headerIcon: {
        marginLeft: 20,
        marginTop: 10,
    },
});
