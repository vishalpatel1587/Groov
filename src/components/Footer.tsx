import { makeStyles, Typography } from "@material-ui/core";
import { colors } from "../styling/styles/colors";
import { Link } from "../components";
const useStyles = makeStyles((theme) => ({
  link: {
    color: colors.royalBlue,
  },
  linkButton: {
    margin: theme.spacing(1),
  },
  withLink: { display: "flex", justifyContent: "center" },
  footer: {
    margin: theme.spacing(6, 0),
    display: "flex",
    alignItems: "center",
  },
}));
const Footer = () => {
  const classes = useStyles();

  return (
    <Typography
      variant="body1"
      gutterBottom
      align="center"
      className={`${classes.footer} ${classes.withLink}`}
    >
      If you need any help, please get in touch with our
      <Link href="mailto:support@mentemia.com">
        <Typography variant="h4" className={classes.link}>
          support team.
        </Typography>
      </Link>
    </Typography>
  );
};

export default Footer;
