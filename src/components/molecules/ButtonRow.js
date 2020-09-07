import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import Colors from "../../styles/Color";
import OutlinedButton from "../atoms/OutlinedButton";
import SolidButton from "../atoms/SolidButton";

/**
 * This function returns a stateful component which manages a row of buttons.
 * The buttons will have values determined by the buttons prop passed in
 *
 * @param {Object} props Contains all the props passed in with the JSX component
 */
export default function ButtonRow({ buttons, onChange, style }) {
  // Creating an array of all false values to signify
  // all buttons being off
  const allButtonsOff = [];
  buttons.forEach(() => allButtonsOff.push(false));

  const [states, setStates] = useState(allButtonsOff);

  // Toggles states[index] on and everything else off
  function stateController(index) {
    // If this state is true, the button is already
    // pressed, so pass through the function
    if (states[index]) {
      return;
    }

    // If not, go back to an allButtonsOff array
    // and only turn the button that is pressed on
    allButtonsOff[index] = true;

    setStates([...allButtonsOff]);

    // Since the button is toggled, and if there is an onChange
    // action passed into this component, execute it at the change
    if (onChange) {
      onChange(buttons[index]);
    }
  }

  // Since we want a variable amount of buttons in a button row, we
  // are going to make an array of <TouchableOpacity> components
  // with texts in them to account for the variable amount of buttons.
  const buttonList = buttons.map((button, index) => {
    if (states[index]) {
      return (
        <SolidButton
          key={index}
          style={{ flex: 1, marginLeft: index === 0 ? 0 : 16 }}
          onPress={() => stateController(index)}
          text={button}
        />
      );
    }
    return (
      <OutlinedButton
        key={index}
        style={{ flex: 1, marginLeft: index === 0 ? 0 : 16 }}
        onPress={() => stateController(index)}
        text={button}
      />
    );
  });

  // We return the buttonList defined above embedded in a horizontal view
  return <View style={styles.buttonRow}>{buttonList}</View>;
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 26,
    alignSelf: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
});
