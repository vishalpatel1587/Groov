import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import "./styles/fonts.css";
import { colors } from "./styles/colors";

let theme = createTheme({
  palette: {
    primary: {
      main: colors.blue,
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
      primary: colors.slateGrey,
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
      fontSize: 36,
      fontFamily: [
        "Averta-ExtraBold",
        "Helvetica",
        "Verdana",
        "sans-serif",
      ].join(","),
      color: colors.darkGrey,
    },
    h2: {
      fontSize: 24,
      color: colors.darkGrey,
      fontFamily: [
        "Averta-ExtraBold",
        "Helvetica",
        "Verdana",
        "sans-serif",
      ].join(","),
    },
    subtitle1: {
      fontSize: "1rem",
      fontFamily: [
        "Averta-Semibold",
        "Helvetica",
        "Verdana",
        "sans-serif",
      ].join(","),
      color: colors.slateGrey,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: "0.75rem",
      fontFamily: [
        "Averta-Semibold",
        "Helvetica",
        "Verdana",
        "sans-serif",
      ].join(","),
      color: colors.slateGrey,
    },
    h3: {
      fontSize: 20,
      fontWeight: 800,
      fontFamily: [
        "Averta-Semibold",
        "Helvetica",
        "Verdana",
        "sans-serif",
      ].join(","),
      color: colors.darkGrey,
    },
    h4: {
      fontSize: 16,
      fontWeight: "normal",
      fontFamily: ["Averta", "Helvetica", "Verdana", "sans-serif"].join(","),
      color: colors.darkGrey,
    },
    body1: {
      fontSize: 16,
      fontWeight: "normal",
      fontFamily: ["Averta", "Helvetica", "Verdana", "sans-serif"].join(","),
      color: colors.black,
    },
    body2: {
      fontSize: 16,
      fontWeight: "normal",
      fontFamily: [
        "Averta-Semibold",
        "Helvetica",
        "Verdana",
        "sans-serif",
      ].join(","),
      color: colors.slateGrey,
    },
  },
  spacing: 4,
});

theme = responsiveFontSizes(theme, { breakpoints: ["xs", "sm"] });

export default theme;
