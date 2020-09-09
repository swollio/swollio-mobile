import React, { useContext } from "react";
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { UserContext } from "../../utilities/UserContext";
import { TokenContext } from "../../utilities/TokenContext";
import { AthleteWorkoutContext } from "../../utilities/AthleteWorkoutContext";

import RootHeader from "../../components/organisms/RootHeader";

import Colors from "../../styles/Color";
import Font from "../../styles/Font";
import TabPageStyles from "../styles/TabPage";
import LoadingPage from "../LoadingPage";
// import AbCard from "../../components/organisms/AbCard";
import WorkoutCover from "../../components/organisms/WorkoutCover";
import Card from "../../components/organisms/Card";

export default function AthleteHomeScreen() {
  const { user } = useContext(UserContext);
  const { workouts } = useContext(AthleteWorkoutContext);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { removeToken } = useContext(TokenContext);

  // const abCard = (
  //   <AbCard
  //     exercises={[
  //       "High Plank",
  //       "Russian Twists",
  //       "Pidgeon Crunches",
  //       "Side Plank",
  //       "Low Plank",
  //       "Penguins",
  //       "Crunches",
  //       "In-and-outs",
  //       "Reverse Crunches",
  //       "V-Ups",
  //       "Bicycle Kicks",
  //       "Low Plank",
  //       "Flutter Kicks",
  //       "Situps",
  //       "V Sit",
  //       "Leg Lifts",
  //       "V Ups",
  //     ]}
  //   />
  // );

  if (!user) {
    return <LoadingPage />;
  }

  function UpcomingWorkoutCovers() {
    return workouts[0].workouts.map((workout) => {
      return (
        <WorkoutCover
          key={workout.id}
          color={Colors.Primary}
          completed={workout.completed}
          title={workout.name}
          team_name={workout.team_name}
          created={workout.date}
          onStartWorkout={() =>
            navigation.navigate("WorkoutPage", {
              workout_id: workout.id,
              assignments: workout.assignments,
              date: workouts[0].date,
            })
          }
        />
      );
    });
  }

  return (
    <SafeAreaView style={TabPageStyles.pageContainer}>
      <View style={styles.background}>
        <RootHeader
          title={`Welcome, ${user.first_name}!`}
          action="Logout"
          onAction={() => {
            removeToken().then(() => navigation.navigate("LoginPage"));
          }}
        />
        <ScrollView
          style={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionLabel}>Upcoming</Text>
          {(workouts === null && (
            <Card>
              <Text style={styles.bodyText}>Loading...</Text>
            </Card>
          )) ||
            (workouts.length === 0 && (
              <Card>
                <Text style={styles.bodyText}> No Workouts Today </Text>
              </Card>
            )) ||
            (isFocused ? <UpcomingWorkoutCovers /> : <LoadingPage />)}
          {/* <Text style={styles.sectionLabel}>Featured</Text>
          {abCard} */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: Colors.SurfaceContrast,
    fontFamily: Font.Header,
    textAlign: "left",
    marginBottom: 15,
  },
  background: {
    backgroundColor: Colors.Background,
    flex: 1,
  },
  rows: {
    flexDirection: "row",
    borderColor: Colors.SurfaceContrast2,
    borderTopWidth: 1,
    padding: 5,
  },
  setWeight: {
    marginTop: 20,
    borderColor: Colors.Primary,
    borderWidth: 1,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  scrollViewContainer: {
    padding: 10,
    flex: 1,
  },
  padding: {
    padding: 16,
  },
  sectionLabel: {
    fontSize: 18,
    fontFamily: Font.Header,
    color: Colors.SurfaceContrast,
    marginTop: 12,
    marginBottom: 12,
  },
  bodyText: {
    fontFamily: Font.Body,
    padding: 8,
    fontSize: 16,
    fontWeight: "300",
    color: Colors.SurfaceContrast,
  },
});
