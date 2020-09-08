import React, { useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import Colors from "../../styles/Color";

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
        return (
          <TouchableOpacity
            key={currentId}
            activeOpacity={0.8}
            style={[
              {
                height: 50,
                paddingHorizontal: 24,
                margin: 8,
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 25,
                borderColor: Colors.Primary,
                borderWidth: 1,
              },
              selected[currentId] ? { backgroundColor: Colors.Primary } : {},
            ]}
            onPress={() => {
              selected[currentId] = !selected[currentId];
              setSelected({ ...selected });
              const result = items.filter((y) => selected[y.id]);
              onChange(result);
            }}
          >
            <Text
              style={{
                color: selected[id] ? Colors.PrimaryContrast : Colors.Primary,
              }}
            >
              {text(x)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
