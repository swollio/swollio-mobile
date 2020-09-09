import { Appearance } from "react-native";

const getColorPalette = () => {
  if (Appearance.getColorScheme() === "dark") {
    return {
      Primary: "#EC4B57", // '#07163f',
      PrimaryContrast: "#000000",

      Secondary: "#EC4B57",
      SecondaryContrast: "#000000",

      Background: "#131313",
      BackgroundContrast: "#FFFFFF",

      Surface: "#1c1c1c",
      SurfaceContrast: "#FFFFFF",
      SurfaceContrast2: "#989898",

      Error: "#EC4B57",
      ErrorContrast: "#000000",
    };
  }
  return {
    Primary: "#D02235", // '#07163f',
    PrimaryContrast: "#FFFFFF",

    Secondary: "#D02235",
    SecondaryContrast: "#FFFFFF",

    Background: "#EEEEEE",
    BackgroundContrast: "#24272B",

    Surface: "#FFFFFF",
    SurfaceContrast: "#24272B",
    SurfaceContrast2: "#BCBCBC",

    Error: "#D02235",
    ErrorContrast: "#FFFFFF",
  };
};

export default getColorPalette();
