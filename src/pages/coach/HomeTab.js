import React, { useContext } from "react";
import { ScrollView, View, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Utilities
import { UserContext } from "../../utilities/UserContext";
import { TokenContext } from "../../utilities/TokenContext";

// Organisms
import RootHeader from "../../components/organisms/RootHeader";
import UpcomingWorkoutList from "../../components/organisms/UpcomingWorkoutList";
import AthleteList from "../../components/organisms/AthleteList";

// Styles
import TabPageStyles from "../styles/TabPage";

export default function CoachHomeScreen() {
  const { user } = useContext(UserContext);
  const { removeToken } = useContext(TokenContext);
  const navigation = useNavigation();

  // Log the user out of the app by deleting their token and returning to
  // the login page.
  const onLogout = () =>
    removeToken().then(() => navigation.navigate("LoginPage"));

  return (
    <SafeAreaView style={TabPageStyles.pageContainer}>
      <RootHeader
        title={`Welcome ${user.first_name}.`}
        action="Logout"
        onAction={onLogout}
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
