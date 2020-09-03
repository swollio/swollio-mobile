import { StyleSheet } from "react-native";
import Colors from "../../../styles/Color";
import Fonts from "../../../styles/Font";

export default StyleSheet.create({
  title: {
    fontFamily: Fonts.Header,
    color: Colors.SurfaceContrast,
    fontSize: 36,
    marginVertical: 4,
  },
  subtitle: {
    fontFamily: Fonts.Body,
    fontWeight: "300",
    color: Colors.SurfaceContrast2,
    fontSize: 20,
    marginVertical: 4,
  },
});
