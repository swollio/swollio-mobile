import * as React from "react";
import {Text, Button, View, SafeAreaView} from "react-native";

import RootHeader from "../../components/organisms/RootHeader";

import TabPageStyles from "../styles/TabPage";
import {useNavigation} from "@react-navigation/native";

export default function AthleteStatisticsScreen() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={TabPageStyles.pageContainer}>
            <RootHeader title={"Progress."} />
            <View style={TabPageStyles.pageMain}>
                <Text>Athlete Statistics Screen</Text>
                <Button
                    title="Go to Details"
                    onPress={() => navigation.navigate("Details")}
                />
            </View>
        </SafeAreaView>
    );
}
