import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";

import Color from "../../styles/Color";

import HomeTab from "./HomeTab";
import WorkoutTab from "./WorkoutTab";
import StatisticsTab from "./StatisticsTab";

const AthleteTab = createBottomTabNavigator();

export default function AthleteMainScreen() {
  return (
    <AthleteTab.Navigator
      tabBarOptions={{
        style: { padding: 8 },
        activeTintColor: Color.Primary,
      }}
    >
      <AthleteTab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icon size={size} color={color} name="user" />
          ),
        }}
        component={HomeTab}
      />
      <AthleteTab.Screen
        name="Workouts"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icon size={size} color={color} name="clipboard" />
          ),
        }}
        component={WorkoutTab}
      />
      <AthleteTab.Screen
        name="Progress"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icon size={size} color={color} name="chart-bar" />
          ),
        }}
        component={StatisticsTab}
      />
    </AthleteTab.Navigator>
  );
}
