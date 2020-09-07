import { StyleSheet } from "react-native";
import Colors from "../../../styles/Color";
import Fonts from "../../../styles/Font";

export default StyleSheet.create({
  container: {
    width: "100%",
    borderColor: Colors.Primary,
    borderBottomWidth: 2,
    backgroundColor: Colors.Surface,
  },
  safeAreaTop: {
    backgroundColor: Colors.Surface,
  },
  header: {
    padding: 16,
    width: "100%",
  },
  text: {
    color: Colors.SurfaceContrast,
  },
  title: {
    fontSize: 30,
    fontFamily: Fonts.Header,
    color: Colors.SurfaceContrast,
    textAlign: "left",
  },
  subtitle: {
    fontSize: 18,
    fontFamily: Fonts.Header,
    color: Colors.SurfaceContrast2,
    textAlign: "left",
    width: "100%",
    marginVertical: 8,
  },
});
