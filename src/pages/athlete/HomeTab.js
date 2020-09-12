import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import moment from "moment";

// Utilities
import { UserContext } from "../../utilities/UserContext";
import { TokenContext } from "../../utilities/TokenContext";
import { AthleteWorkoutContext } from "../../utilities/AthleteWorkoutContext";

// Styles
import Colors from "../../styles/Color";
import Font from "../../styles/Font";
import TabPageStyles from "../styles/TabPage";

import RootHeader from "../../components/organisms/RootHeader";
import Card from "../../components/organisms/Card";
import WorkoutCover from "../../components/organisms/WorkoutCover";
import useApi from "../../utilities/api";
import LoadingPage from "../LoadingPage";
import FeedItem from "../../components/organisms/FeedItem";
// import AbCard from "../../components/organisms/AbCard";

export default function AthleteHomeScreen() {
  const { user } = useContext(UserContext);
  const { workouts } = useContext(AthleteWorkoutContext);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { removeToken } = useContext(TokenContext);

  const [feedItems, setFeedItems] = useState(null);
  const { getFeedForAthlete } = useApi();
  useEffect(() => {
    (async function () {
      setFeedItems(await getFeedForAthlete());
    })();
  }, [user, isFocused]);
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
    // Find the first set of workouts scheduled at earliest for the start of
    // the current day.
    const firstUpcomingWorkoutGroup = workouts.find((group) =>
      moment.utc(group.date).isSameOrAfter(moment.utc(), "day")
    );

    if (!firstUpcomingWorkoutGroup) return [];
    return firstUpcomingWorkoutGroup.workouts.map((workout) => {
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
          onEditWorkout={() => navigation.navigate("EditWorkout", { workout })}
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
          {feedItems
            ? feedItems.map((item) => <FeedItem key={item.id} item={item} />)
            : null}
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
    backgroundColor: Colors.Surface,
    flex: 1,
  },
  rows: {
    flexDirection: "row",
    borderColor: Colors.Background,
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
