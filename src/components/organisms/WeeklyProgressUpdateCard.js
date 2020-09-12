/**
 * The WeeklyProgressUpdateCard displays a simple progress indicator that
 * marks completed workouts, and resets on a weekly basis. This allows for
 * athletes to get a 'fresh start' every monday, and hopefully complete
 * more workouts in an effort to complete all the workouts that week.
 */

// Libraries
import React, { useContext, useState, useEffect } from "react";
import { View, Text } from "react-native";
import moment from "moment";

// Utilities
import { AthleteWorkoutContext } from "../../utilities/AthleteWorkoutContext";

// Organisms
import Card from "./Card";
import Colors from "../../styles/Color";
import Fonts from "../../styles/Font";

export default function WeeklyProgressUpdateCard() {
  const { workouts } = useContext(AthleteWorkoutContext);
  const [totalWorkoutCount, setTotalWorkoutCount] = useState(null);
  const [completedWorkoutCount, setCompletedWorkoutCount] = useState(null);

  useEffect(() => {
    if (workouts === null) return;

    let total = 0;
    let completed = 0;

    workouts.forEach((group) => {
      // This variable indicates whether the scheduled date of the workout
      // occurs this week. Note that and isoWeek differs from a week in that
      // an isoWeek starts on monday and a week starts on sunday.
      //
      // Note that moment.isBetween takes two additional parameters:
      // 1. granularity: the order of magnitude of comparison
      // 2. inclusivity: boundary conditions in interval notation
      const scheduledForThisWeek = moment
        .utc(group.date)
        .isBetween(
          moment.utc().startOf("isoWeek"),
          moment.utc().endOf("isoWeek"),
          "day",
          "[]"
        );

      if (scheduledForThisWeek) {
        total += group.workouts.length;
        completed += group.workouts.reduce(
          (acc, curr) => (acc + curr.completed ? 1 : 0),
          0
        );
      }
    });

    setTotalWorkoutCount(total);
    setCompletedWorkoutCount(completed);
  }, [workouts]);

  if (workouts === null) {
    return <Card />;
  }

  return (
    <Card>
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 8,
          }}
        >
          {[...Array(totalWorkoutCount).keys()].map((i) => (
            <View
              key={i}
              style={{
                backgroundColor:
                  i < completedWorkoutCount
                    ? Colors.Primary
                    : Colors.Background,
                width: 30,
                height: 30,
                marginHorizontal: 4,
                borderRadius: 15,
              }}
            />
          ))}
        </View>
        <View
          style={{
            marginTop: 8,
            paddingVertical: 4,
            paddingHorizontal: 8,
            backgroundColor: Colors.Background,
            borderRadius: 6,
          }}
        >
          <Text
            style={{
              color: Colors.BackgroundContrast,
              fontWeight: "500",
              fontFamily: Fonts.Body,
              fontSize: 12,
            }}
          >
            {` You have finished ${completedWorkoutCount || 0} out of ${
              totalWorkoutCount || 0
            } workouts this week!`}
          </Text>
        </View>
      </View>
    </Card>
  );
}
