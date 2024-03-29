import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Text, View, StyleSheet } from "react-native";

import Colors from "../../styles/Color";
import Fonts from "../../styles/Font";

/**
 * WorkoutDetailsItem displays single editable options with an associated
 * icon representing some property about a workout. The icon indicated which
 * property ('date', 'repeat', etc). The 'more-horizontal' icon can be clicked
 * on to edit the value of the field.
 *
 * This icon is currently used by 'WorkoutDetailsHeader', but may be moved around
 * later.
 *
 * PropType:
 * - icon: string
 * - value: string
 */
export default function WorkoutDetailsItem(props) {
  return (
    <View style={styles.item}>
      <Icon name={props.icon} style={styles.itemIcon} />
      <Text style={styles.itemText}>{props.value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    borderColor: Colors.Background,
    borderTopWidth: 1,
  },
  itemIcon: {
    fontSize: 18,
    color: Colors.SurfaceContrast,
  },
  itemText: {
    flex: 1,
    fontSize: 18,
    color: Colors.SurfaceContrast,
    fontFamily: Fonts.Header,
    textAlign: "left",
    marginLeft: 16,
  },
});
