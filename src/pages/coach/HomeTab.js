import React, { useContext } from "react";
import { ScrollView, View, SafeAreaView } from "react-native";

import { useNavigation } from "@react-navigation/native";
import RootHeader from "../../components/organisms/RootHeader";

import TabPageStyles from "../styles/TabPage";
import UpcomingWorkoutList from "../../components/organisms/UpcomingWorkoutList";
import AthleteList from "../../components/organisms/AthleteList";
import { UserContext } from "../../utilities/UserContext";
import { TokenContext } from "../../utilities/TokenContext";

export default function CoachHomeScreen() {
  const { user } = useContext(UserContext);
  const { removeToken } = useContext(TokenContext);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={TabPageStyles.pageContainer}>
      <RootHeader
        action="Logout"
        onAction={() => {
          removeToken().then(() => navigation.navigate("LoginPage"));
        }}
        title={`Welcome ${user.first_name}.`}
      />
      <View style={TabPageStyles.pageMain}>
        <ScrollView style={TabPageStyles.scrollView}>
          <UpcomingWorkoutList />
          <AthleteList />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
