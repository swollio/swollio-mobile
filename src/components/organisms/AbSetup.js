import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Colors from "../../styles/Color";
import Font from "../../styles/Font";
import Card from "./Card";
import ButtonRow from "../molecules/ButtonRow";
import ScrollPicker from "../molecules/ScrollPicker";
import SolidButton from "../atoms/SolidButton";

/**
 * This component is a way to setup the details for your ab exercise
 * @param {Object} props Contains the props needed for this card
 */
export default function AbSetup(props) {
  return (
    <Card>
      <Text style={styles.title}>Setup your ab exercise:</Text>
      <Text style={styles.body}>Set your rep time:</Text>
      <View style={styles.center}>
        <ButtonRow
          style={styles.toggleButton}
          buttons={[15, 30, 45, 60]}
          onChange={(button) => props.onPress(button)}
        />
      </View>
      <Text style={styles.body}>Set number of exercises:</Text>
      <View style={styles.center}>
        <ScrollPicker
          selectColor={Colors.Primary}
          data={[...Array(18).keys()].map((x) => x + 1)}
          initialValue={12}
          onChange={(i) => props.onChange(i)}
        />
      </View>
      <Text style={[styles.body, styles.bodyAddendum]}>
        This will take {props.totalTime}
{' '}
minutes
</Text>
      <View style={styles.center}>
        <SolidButton onPress={props.onFinish} text="Bring it on!" />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: Colors.SurfaceContrast,
    fontFamily: Font.Header,
    textAlign: "left",
  },
  body: {
    fontSize: 18,
    fontFamily: Font.Header,
    color: Colors.SurfaceContrast,
    marginVertical: 16,
  },
  bodyAddendum: {
    fontSize: 22,
    marginTop: 20,
  },
  toggleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  center: {
    alignItems: "center",
  },
});
