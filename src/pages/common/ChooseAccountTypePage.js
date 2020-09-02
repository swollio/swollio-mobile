import React, {useState, useContext, useEffect} from "react";
import {
    Text,
    View,
    SafeAreaView,
    TextInput,
    KeyboardAvoidingView,
    StyleSheet,
} from "react-native";
import {useNavigation, Link} from "@react-navigation/native";
import SolidButton from "../../components/atoms/SolidButton";
import ErrorMessage from "../../components/molecules/ErrorMessage";
import {UserContext} from "../../utilities/UserContext";
import Colors from "../../styles/Color";
import Fonts from "../../styles/Font";
import Icon from "react-native-vector-icons/FontAwesome5";
import {TouchableOpacity} from "react-native-gesture-handler";
import OutlinedButton from "../../components/atoms/OutlinedButton";

export default function ChooseAccountTypePage() {
    const {user} = useContext(UserContext);
    const navigation = useNavigation();

    useEffect(() => {
        if (user.athlete_id) {
            navigation.navigate("AthleteMainScreen");
        } else if (user.team_id) {
            navigation.navigate("CoachMainScreen");
        }
    }, [user, navigation]);

    return (
        <SafeAreaView>
            <View style={styles.form}>
                <View style={styles.fieldContainer}>
                    <View>
                        <Text style={styles.title}>Setup Account.</Text>
                        <Text style={styles.subtitle}>Are you an athlete or a coach?</Text>
                    </View>
                    <View style={{alignItems: "center", paddingVertical: 16}}>
                        <OutlinedButton
                            text="Athlete"
                            style={{marginVertical: 8}}
                            onPress={() => navigation.navigate("SetupAthlete")}
                        />
                        <OutlinedButton
                            text="Coach"
                            style={{marginVertical: 8}}
                            onPress={() => navigation.navigate("SetupCoach")}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        maxWidth: "80%",
        fontFamily: Fonts.Header,
        color: Colors.SurfaceContrast,
        textAlign: "left",
        width: "100%",
    },
    subtitle: {
        fontSize: 18,
        maxWidth: "80%",
        fontFamily: Fonts.Header,
        color: Colors.SurfaceContrast2,
        textAlign: "left",
        width: "100%",
        marginVertical: 8,
    },
    textInputContainer: {
        color: Colors.SurfaceContrast,
        backgroundColor: Colors.Background,
        paddingHorizontal: 16,
        fontSize: 16,
        paddingVertical: 16,
        borderRadius: 6,
        marginVertical: 8,
        flexDirection: "row",
        borderColor: Colors.SurfaceContrast2,
        borderWidth: 1,
    },
    form: {
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        width: "100%",
    },
    bodyText: {
        fontSize: 20,
        marginVertical: 16,
        fontFamily: Fonts.Header,
    },

    fieldContainer: {
        paddingHorizontal: 24,
        justifyContent: "center",
        width: "100%",
        flex: 1,
    },
    textInput: {flex: 1, paddingHorizontal: 8, fontSize: 16},
    buttonGroupContainer: {width: "100%", alignItems: "center"},
});
