import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import {
  NavLink as RCTNavLink,
  NavLinkProps,
  useRouteMatch,
} from "react-router-dom";
import { colors } from "../styling/styles/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    routeText: {
      color: colors.slateGrey,
      fontSize: 16,
      marginBottom: theme.spacing(1),
      marginLeft: 0,
      marginRight: theme.spacing(3),
      padding: 0,
      fontWeight: "bold",
      height: 20,
      letterSpacing: 0,
      textDecoration: "none",
      paddingBottom: theme.spacing(2),
      textTransform: "none",
    },
    activeRouteText: {
      color: colors.blue,
    },
    underline: {
      borderBottom: `2px solid ${colors.blue}`,
    },
  })
);

export const NavLink = (props: NavLinkProps) => {
  const classes = useStyles(props);
  let match = useRouteMatch(props.to as string);

  return (
    <RCTNavLink
      {...props}
      activeClassName={classes.activeRouteText}
      className={`${classes.routeText} ${match ? classes.underline : ""}`}
    />
  );
};
