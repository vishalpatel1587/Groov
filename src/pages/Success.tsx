import { useParams } from "react-router-dom";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { Link, Button } from "../components";
import logo from "../assets/groov_logo.png";
import { colors } from "../styling/styles/colors";
import history from "../utils/history";
import {TeamCreatedSuccessfullyPage} from "../test/constants/teamCreatedSuccessfullyPageTestId"

interface Props {
  location: any;
}
interface ParamTypes {
  companyId: string;
}

const useStyles = makeStyles((theme) => ({
  content: {
    height: theme.spacing(130),
    width: theme.spacing(140),
    backgroundColor: colors.white,
    textAlign: "center",
    padding: theme.spacing(10),
  },
  icon: {
    width: theme.spacing(50),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(10),
  },
  link: {
    color: colors.royalBlue,
  },
  linkButton: {
    margin: theme.spacing(1),
  },
  subHeader: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
  button: {
    marginTop: theme.spacing(15),
  },
}));

const Success = (props: Props) => {
  const classes = useStyles();
  const { companyId } = useParams<ParamTypes>();
  const { location } = props;

  const teamId =
    location.search &&
    location.search.substring(location.search.indexOf("=") + 1);

  return (
    <div className={classes.content}>
      <img className={classes.icon} src={logo} alt={"logo"}></img>
      <Typography data-testid={TeamCreatedSuccessfullyPage.CongratulationsHeader} variant="h1">Congratulations!!</Typography>
      <Typography data-testid={TeamCreatedSuccessfullyPage.SuccessMessageHeader} variant="h1">
        You have added a new team with the first ritual on your ritual page.
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        align="center"
        className={classes.subHeader}
      >
        Here is the unique
        <Link href={`/${companyId}/${teamId}/rituals`}>
          <Typography variant="h4" className={classes.link}>
            team link.
          </Typography>
        </Link>{" "}
        Only your team can share it, continue with committing rituals, and
        updating new rituals.
      </Typography>
      <Button
        className={classes.button}
        onClick={() => history.push(`/${companyId}/${teamId}/rituals`)}
      >
        <Box data-testid={TeamCreatedSuccessfullyPage.GoToTeamPageLink}>Go to the team page</Box>
      </Button>
    </div>
  );
};

export default Success;
