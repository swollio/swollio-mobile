import React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../../styles/Color";

/**
 * This component returns a Card, which is the building block of our UI. This card is formatted
 * to be a view with a left border of the given color
 *
 * @param {Object} props The only props are going to be the children which are embedded in this card
 */
export default function Card({ children }) {
  return (
    <View style={styles.cardOuter}>
      <View style={styles.cardInner}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardOuter: {
    backgroundColor: Colors.Surface,
    width: "100%",
    borderRadius: 4,
    overflow: "hidden",
    marginVertical: 4,
  },
  cardInner: {
    width: "100%",
    borderLeftColor: Colors.Primary,
    borderLeftWidth: 10,
    padding: 8,
  },
});
