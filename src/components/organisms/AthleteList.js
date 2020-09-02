import React, { useContext } from "react";
import { Text, Share, View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Color from "../../styles/Color";
import Font from "../../styles/Font";
import OutlinedButton from "../atoms/OutlinedButton";
import LoadingView from "../molecules/LoadingView";
import { UserContext } from "../../utilities/UserContext";
import { AthletesContext } from "../../utilities/AthletesContext";

function AthleteListItem({ first_name, last_name }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.athleteListItem}>
      <Text style={styles.athleteListItemText}>
        {`${first_name} ${last_name}`}
      </Text>
    </TouchableOpacity>
  );
}

export default function AthleteList() {
  const { athletes } = useContext(AthletesContext);
  const { user } = useContext(UserContext);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${user.first_name} ${user.last_name} has invited you to join their team`,
        url: `https://www.swoll.io/join/${user.team_id}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.cardOuter}>
      <View style={styles.cardInner}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.cardTitle}>Athletes</Text>
          <OutlinedButton
            text="Invite"
            onPress={onShare}
            disabled={athletes === null}
            style={{
              width: "auto",
              paddingHorizontal: 16,
              height: 40,
              marginVertical: 4,
            }}
          />
        </View>
        {athletes ? (
          athletes.map((athlete) => (
            <AthleteListItem key={athlete.id} {...athlete} />
          ))
        ) : (
          <LoadingView />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  athleteListItem: {
    width: "100%",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  cardOuter: {
    backgroundColor: Color.PrimaryContrast,
    width: "100%",
    borderRadius: 4,
    overflow: "hidden",
    marginVertical: 4,
  },
  cardInner: {
    width: "100%",
    borderLeftColor: Color.Primary,
    borderLeftWidth: 10,
    padding: 8,
  },
  cardTitle: {
    fontFamily: Font.Header,
    fontSize: 24,
    fontWeight: "bold",
  },
  athleteListItemText: {
    fontFamily: Font.Header,
    fontSize: 20,
  },
});
