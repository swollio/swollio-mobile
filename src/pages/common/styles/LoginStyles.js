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
    fontFamily: Fonts.Header,
    color: Colors.SurfaceContrast2,
    fontSize: 18,
    marginVertical: 4,
  },
});
