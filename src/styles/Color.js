import { Appearance } from "react-native";

const getColorPalette = () => {
  if (Appearance.getColorScheme() === "dark") {
    return {
      Primary: "#FF0266", // '#07163f',
      PrimaryContrast: "#000000",

      Secondary: "#D02235",
      SecondaryContrast: "#FFFFFF",

      Background: "#131313",
      BackgroundContrast: "#FFFFFF",

      Surface: "#1c1c1c",
      SurfaceContrast: "#FFFFFF",
      SurfaceContrast2: "#989898",

      Error: "#FF0266",
      ErrorContrast: "#FFFFFF",
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
