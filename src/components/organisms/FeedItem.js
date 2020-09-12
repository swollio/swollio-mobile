/**
 * The WeeklyProgressUpdateCard displays a simple progress indicator that
 * marks completed workouts, and resets on a weekly basis. This allows for
 * athletes to get a 'fresh start' every monday, and hopefully complete
 * more workouts in an effort to complete all the workouts that week.
 */

// Libraries
import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome5";

// Organisms
import Colors from "../../styles/Color";
import Fonts from "../../styles/Font";

// Molecules
import ProfilePicturePlaceholder from "../molecules/ProfilePicturePlaceholder";

const FeedItemKind = {
  PersonalBest: 1,
  CompletionStreak: 2,
  JoinWorkout: 3,
  MissedWorkout: 4,
};

export default function FeedItem({ item }) {
  return (
    <View style={styles.feedItem}>
      <ProfilePicturePlaceholder user={item.user} />
      <View style={styles.feedContent}>
        {(item.kind === FeedItemKind.PersonalBest && (
          <Text style={styles.feedText}>
            {`${item.user.first_name} ${item.user.last_name} logged a personal best in ${item.extra_data.exercise.name}`}
          </Text>
        )) ||
          (item.kind === FeedItemKind.CompletionStreak && (
            <Text style={styles.feedText}>
              {`${item.user.first_name} ${item.user.last_name} has a workout completion streak of ${item.extra_data.streak}`}
            </Text>
          )) ||
          (item.kind === FeedItemKind.JoinWorkout && (
            <Text style={styles.feedText}>
              {`${item.user.first_name} ${item.user.last_name} joined a new workout "${item.extra_data.workout.name}"`}
            </Text>
          )) ||
          (item.kind === FeedItemKind.MissedWorkout && (
            <Text style={styles.feedText}>
              {`${item.user.first_name} ${item.user.last_name} missed a workout "${item.extra_data.workout.name}"`}
            </Text>
          ))}
        <Text style={styles.timeAgoText}>{moment.utc(item).fromNow()}</Text>

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 16 }}
        >
          <Icon
            name="heart"
            size={14}
            style={{ marginHorizontal: 4, color: Colors.SurfaceContrast }}
          />
          <Text style={styles.feedText}>{`${item.likes}`}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  feedItem: {
    padding: 8,
    backgroundColor: Colors.Surface,
    flexDirection: "row",
  },
  feedContent: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.Surface,
    borderBottomColor: Colors.Background,
    borderBottomWidth: 1,
    flex: 1,
  },
  feedText: {
    fontFamily: Fonts.Body,
    color: Colors.SurfaceContrast,
  },
  timeAgoText: {
    fontFamily: Fonts.Body,
    color: Colors.SurfaceContrast2,
  },
});
