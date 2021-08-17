import { useParams } from 'react-router-dom';
import { makeStyles, Typography } from '@material-ui/core';
import { Link, Button } from '../components';
import logo from '../assets/mentemia_logo.png';
import { colors } from '../styling/styles/colors';
import history from '../utils/history';

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
    textAlign: 'center',
    padding: theme.spacing(10)
  },
  icon: {
    width: theme.spacing(50),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(10)
  },
  link: {
    color: colors.royalBlue,
    fontFamily: 'Averta-Semibold',
    fontWeight: 500
  },
  linkButton: {
    margin: theme.spacing(1)
  },

  subHeader: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8)
  },
  button: {
    marginTop: theme.spacing(15)
  }
}));

const Success = (props: Props) => {
  const classes = useStyles();
  const { companyId } = useParams<ParamTypes>();
  const { location } = props;

  let teamId =
    location.search &&
    location.search.substring(location.search.indexOf('=') + 1);

  return (
    <div className={classes.content}>
      <img className={classes.icon} src={logo} alt={'logo'}></img>
      <Typography variant='h1'>Congratulation!!</Typography>
      <Typography variant='h1'>
        You have added a new team with the first ritual on your ritual page.
      </Typography>
      <Typography
        variant='body2'
        gutterBottom
        align='center'
        className={classes.subHeader}
      >
        Here is the unique
        <Link href={`/${companyId}/${teamId}/rituals`}>
          <Typography variant='h4' className={classes.link}>
            team link.
          </Typography>
        </Link>{' '}
        Only your team can share it, continue with committing rituals, and
        updating new rituals.
      </Typography>
      <Button
        className={classes.button}
        onClick={() => history.push(`/${companyId}`)}
      >
        Go to the team page
      </Button>
    </div>
  );
};

export default Success;
