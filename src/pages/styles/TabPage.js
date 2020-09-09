import { StyleSheet } from "react-native";

import Color from "../../styles/Color";

export default StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: Color.Surface,
    borderBottomColor: Color.Primary,
    borderBottomWidth: 2,
  },
  pageMain: {
    flex: 1,
    backgroundColor: Color.Background,
    justifyContent: "center",
  },
  scrollView: {
    padding: 8,
    width: "100%",
    flex: 1,
  },
});
