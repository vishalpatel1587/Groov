import { colors } from "../../styling/styles/colors";
import theme from "../../styling/theme";

export const toasterStyles = {
  snackbar: {
    height: 80,
    width: 510,
    background: "rgb(255, 255, 255)",
    boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.5)",
    borderRadius: theme.spacing(3),
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: 0,
    fontFamily: ["Averta", "Helvetica", "Verdana", "sans-serif"].join(","),
    color: colors.darkGrey,
  },
  description: {
    fontSize: 16,
    letterSpacing: 0,
    fontFamily: ["Averta", "Helvetica", "Verdana", "sans-serif"].join(","),
    color: colors.slateGrey2,
  },
  iconGrid: {
    display: "flex",
    marginLeft: 14,
    marginRight: 14,
  },
  icon: {
    width: 20,
    height: 20,
    padding: 10,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
  },
  iconSuccess: {
    backgroundColor: colors.groovGreen[100],
  },
  iconWarning: {
    backgroundColor: colors.groovMustard[10],
  },
  iconDefault: {
    backgroundColor: colors.orange,
  },
  close: { margin: 16 },
};
