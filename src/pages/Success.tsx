import { makeStyles, Typography } from '@material-ui/core';
import { Button } from '../components/Button';
import { colors } from '../styling/styles/colors';
import { Link } from '../components/Link';
import logo from '../assets/mentemia_logo.png';
interface Props {}

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
    marginTop: 20,
    marginBottom: 40
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
        <Link>
          <Typography variant='h4' className={classes.link}>
            team link.
          </Typography>
        </Link>{' '}
        Only your team can share it, continue with committing rituals, and
        updating new rituals.
      </Typography>
      <Button
        className={classes.button}
        // onClick={() => history.push('/')}
      >
        Go to the team page
      </Button>
    </div>
  );
};

export default Success;
