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
import ProfilePicturePlaceholder from "../molecules/ProfilePicturePlaceholder";
// Organisms
import Colors from "../../styles/Color";
import Fonts from "../../styles/Font";

export default function FeedItem({ item }) {
  return (
    <View style={styles.feedItem}>
      <ProfilePicturePlaceholder user={item.user} />
      <View style={styles.feedContent}>
        {(item.kind === 1 && (
          <Text style={styles.feedText}>
            {`${item.user.first_name} ${item.user.last_name} logged a personal best in ${item.extra_data.exercise.name}`}
          </Text>
        )) ||
          (item.kind === 2 && (
            <Text style={styles.feedText}>
              {`${item.user.first_name} ${item.user.last_name} has a workout completion streak of ${item.extra_data.streak}`}
            </Text>
          )) ||
          (item.kind === 3 && (
            <Text style={styles.feedText}>
              {`${item.user.first_name} ${item.user.last_name} joined a new workout "${item.extra_data.workout.name}"`}
            </Text>
          )) ||
          (item.kind === 4 && (
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
