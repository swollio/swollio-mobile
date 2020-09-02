import React from "react";
import {ScrollView, View, SafeAreaView} from "react-native";

import RootHeader from "../../components/organisms/RootHeader";

import TabPageStyles from "../styles/TabPage";
import WorkoutList from "../../components/organisms/WorkoutList";
import {useNavigation} from "@react-navigation/native";

export default function CoachWorkoutsScreen() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={TabPageStyles.pageContainer}>
            <RootHeader
                title={"Workouts."}
                action={"Create"}
                onAction={() => {
                    navigation.navigate("EditWorkout", {
                        workout: {
                            name: "",
                            dates: [],
                            assignments: [],
                        },
                    });
                }}
            />
            <View style={TabPageStyles.pageMain}>
                <ScrollView style={TabPageStyles.scrollView}>
                    <WorkoutList />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
