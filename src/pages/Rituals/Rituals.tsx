import styled from 'styled-components';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { Button } from '../../components/Button';
import { useHistory, useParams } from 'react-router-dom';
import { colors } from '../../styling/styles/colors';
import { Card } from '../../components/Card';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Link } from '../../components/Link';
import { Link as NavLink } from 'react-router-dom';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useEffect, useState } from 'react';
import ModalComponent from '../../components/Modal';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { deleteRitual, getRituals } from '../../store/actions/actions';
import SelectMenu from '../../components/Menu';
import Loader from '../../components/Loader';

interface ParamTypes {
  companyId: string;
  teamId: string;
}

interface Props {}
const RootDiv = styled.div`
  margin: 0 20%;
`;

const ButtonDiv = styled.div`
  display: flex;
  padding-left: 35%;
  align-items: baseline;
  margin-bottom: 2em;
`;

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(10),
    marginRight: '5vh'
  },
  link: {
    color: colors.royalBlue,
    fontFamily: 'Averta-Semibold',
    fontWeight: 500
  },
  downloadAction: {
    color: colors.royalBlue,
    fontFamily: 'Averta-Semibold',
    fontWeight: 500
  },
  listContainer: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: 18,
    borderRadius: 12,
    paddingBottom: 18,
    backgroundColor: colors.whisperWhite,
    marginTop: 8
  },
  listRightWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-start'
    }
  },
  listTitle: {
    fontFamily: 'Averta',
    fontWeight: 'normal',
    color: colors.darkGrey,
    marginLeft: theme.spacing(4)
  },
  editIcon: {
    display: 'flex',
    justifyContent: 'center'
  },
  cardHeader: { marginBottom: theme.spacing(4) },
  listHeading: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  },
  boldHeading: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  footer: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6)
  }
}));

const Rituals = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [orderBy, setOrderBy] = useState('asc');
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { companyId, teamId } = useParams<ParamTypes>();

  const rituals = useSelector((state: RootStateOrAny) => state.rituals.data);
  useEffect(() => {
    // dispatch(getTeamById(teamId));
    dispatch(getRituals(teamId));
  }, []);
  const handleOrderBy = (event: React.ChangeEvent<{ value: unknown }>) => {
    setOrderBy(event.target.value as string);
  };
  const renderListItem = ({ id, action, trigger, teamId }: any) => {
    return (
      <Grid container item key={id}>
        <Grid
          container
          direction='row'
          item
          xs={11}
          spacing={1}
          className={classes.listContainer}
        >
          <Grid item xs={5}>
            <Typography variant='h4' className={classes.listTitle}>
              {trigger}
            </Typography>
          </Grid>
          <Grid container item xs={7}>
            <Grid item xs={10}>
              <Typography variant='h4' className={classes.listTitle}>
                {action}
              </Typography>
            </Grid>
            <Grid item xs={2} className={classes.editIcon}>
              <NavLink
                to={{
                  pathname: `/company/${companyId}/ritual/edit/${id}`,
                  state: { id, action, trigger, teamId }
                }}
              >
                <CreateOutlinedIcon style={{ color: colors.royalBlue }} />
              </NavLink>
            </Grid>
          </Grid>
        </Grid>
        <Link style={{ margin: 0 }} onClick={() => dispatch(deleteRitual(id))}>
          <DeleteIcon />
        </Link>
      </Grid>
    );
  };
  return (
    <RootDiv>
      <Typography variant='h1' component='h1' gutterBottom align='center'>
        Rituals
      </Typography>
      <Typography variant='body2' gutterBottom align='center'>
        A simple way to bake wellbeing into your workplace is to create rituals
        for team wellbeing.The idea is to link a wellbeing action, like group
        deep breathing, to something in your work day (a trigger), such as a
        regular meeting. In this way, wellbeing becomes an automatic part of
        every day.
      </Typography>

      <ButtonDiv>
        <Button
          className={classes.button}
          onClick={() =>
            history.push(`/company/${companyId}/${teamId}/ritual/add`)
          }
        >
          Create a new ritual
        </Button>
        <Link
          startIcon={<HelpOutlineIcon color={'primary'} />}
          onClick={() => setOpen(true)}
        >
          <Typography variant='h4' className={classes.link}>
            More
          </Typography>
        </Link>
      </ButtonDiv>
      {open && (
        <ModalComponent
          open={open}
          icon={true}
          title='Create new ritual'
          message='Let your team agree on rituals which you want to do regularly. You can update, delete or create a new one depend on what works for your team.'
          buttonTitle='Close'
          onButtonClick={() => setOpen(false)}
        />
      )}
      <Card>
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          className={classes.cardHeader}
        >
          <Typography variant='h2' component='h5' gutterBottom>
            Commited Rituals
          </Typography>
          <Link endIcon={<GetAppIcon style={{ color: colors.royalBlue }} />}>
            <Typography variant='h4' className={classes.downloadAction}>
              Download all rituals
            </Typography>
          </Link>
        </Grid>
        {rituals.rituals.length > 0 ? (
          <Grid container>
            <Grid item xs={2}>
              <Box display='flex'>
                <Typography
                  variant='h4'
                  style={{ fontWeight: 'bold', marginRight: 10 }}
                >
                  {` Sort `}
                  <SelectMenu
                    value={orderBy}
                    onChange={handleOrderBy}
                    items={[
                      { label: 'A - Z', value: 'asc' },
                      { label: 'Z - A', value: 'desc' }
                    ]}
                  />
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3} className={classes.listHeading}>
              <Typography variant='h4'> Triggers</Typography>
            </Grid>
            <Grid item xs={6} className={classes.listHeading}>
              <Typography variant='h4'>Actions</Typography>
            </Grid>
            {rituals &&
              rituals.rituals?.map((items: any) => renderListItem(items))}
          </Grid>
        ) : (
          <>
            {rituals.loading ? (
              <Box p={10} display='flex' justifyContent='center'>
                <Loader color={colors.royalBlue} size={50} thickness={4} />
              </Box>
            ) : (
              <Box p={10}>
                <Typography variant='h3' component='h2' align='center'>
                  No data
                </Typography>
              </Box>
            )}
          </>
        )}
      </Card>
      <Typography
        variant='body2'
        gutterBottom
        align='center'
        className={classes.footer}
      >
        If you have any complications, please get in touch with our
        <Link>
          <Typography variant='h4' className={classes.link}>
            support team.
          </Typography>
        </Link>
      </Typography>
    </RootDiv>
  );
};

export default Rituals;
