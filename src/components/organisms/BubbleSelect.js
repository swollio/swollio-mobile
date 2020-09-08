import React, { useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import Colors from "../../styles/Color";
import SolidButton from "../atoms/SolidButton";
import OutlinedButton from "../atoms/OutlinedButton";

export default function MultiSelect({ items, id, text, onChange }) {
  const initialState = {};
  items.map(id).forEach((item) => {
    initialState[item] = false;
  });

  const [selected, setSelected] = useState(initialState);

  return (
    <View
      style={{
        width: "100%",
        paddingVertical: 36,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      {items.map((x) => {
        const currentId = id(x);
        if (selected[currentId]) {
          return (
            <SolidButton
              key={currentId}
              style={{ paddingHorizontal: 16, margin: 4 }}
              text={text(x)}
              onPress={() => {
                selected[currentId] = !selected[currentId];
                setSelected({ ...selected });
                const result = items.filter((y) => selected[y.id]);
                onChange(result);
              }}
            />
          );
        }
        return (
          <OutlinedButton
            key={currentId}
            style={{ paddingHorizontal: 16, margin: 4 }}
            text={text(x)}
            onPress={() => {
              selected[currentId] = !selected[currentId];
              setSelected({ ...selected });
              const result = items.filter((y) => selected[y.id]);
              onChange(result);
            }}
          />
        );
      })}
    </View>
  );
}
