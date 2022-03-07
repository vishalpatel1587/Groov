import { createTheme } from "@material-ui/core/styles";
import "./styles/fonts.css";
import { colors } from "./styles/colors";

const getFontFamily = () =>
  ["Averta", "Helvetica", "Verdana", "sans-serif"].join(",");

let theme = createTheme({
  palette: {
    primary: {
      main: colors.groovBlue[100],
    },
    secondary: {
      main: colors.royalBlue,
    },
    success: {
      main: colors.green2,
    },
    warning: {
      main: colors.gray1,
    },
    text: {
      primary: colors.black,
    },
    background: {
      default: colors.whisperWhite,
    },
    grey: {
      400: colors.mysticGrey,
    },
  },
  typography: {
    fontFamily: [
      "Averta",
      "Averta-Bold",
      "Averta-ExtraBold",
      "Helvetica",
      "Verdana",
      "sans-serif",
    ].join(","),
    fontSize: 14,
    h1: {
      fontFamily: getFontFamily(),
      fontWeight: 700,
      fontSize: 32,
      lineHeight: "42px",
    },
    h2: {
      fontFamily: getFontFamily(),
      fontWeight: 700,
      fontSize: 24,
      lineHeight: "36px",
    },
    h3: {
      fontFamily: getFontFamily(),
      fontWeight: 600,
      fontSize: 20,
      lineHeight: "30px",
    },
    h4: {
      fontFamily: getFontFamily(),
      fontSize: 18,
      fontWeight: "normal",
      lineHeight: "30px",
    },
    h5: {
      fontFamily: getFontFamily(),
      fontSize: 16,
      fontWeight: 600,
      lineHeight: "30px",
    },
    h6: {
      fontFamily: getFontFamily(),
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "21px",
    },
    subtitle1: {
      fontFamily: getFontFamily(),
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    subtitle2: {
      fontFamily: getFontFamily(),
      fontSize: "0.75rem",
    },
    body1: {
      //`paragraph` in the designs
      fontFamily: getFontFamily(),
      fontWeight: 400,
      fontSize: 16,
      lineHeight: "24px",
    },
    body2: {
      fontFamily: getFontFamily(),
      fontSize: 20,
      fontWeight: 400,
      lineHeight: "30px",
    },
  },
  spacing: 4,
});

export default theme;
