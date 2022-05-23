import { Tooltip, withStyles } from "@material-ui/core";
import { colors } from "../styling/styles/colors";

export const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: colors.black,
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
}))(Tooltip);
