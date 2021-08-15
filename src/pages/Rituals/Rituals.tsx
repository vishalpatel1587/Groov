import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Box,
  Grid,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link as NavLink } from 'react-router-dom';
import { useHistory, useParams } from 'react-router-dom';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { deleteRitual, getRituals } from '../../store/actions/actions';

import {
  Loader,
  Card,
  Link,
  Button,
  SelectMenu,
  ModalComponent
} from '../../components';
import { colors } from '../../styling/styles/colors';

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
    marginRight: theme.spacing(10)
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
    padding: theme.spacing(3, 4),
    borderRadius: theme.spacing(3),
    backgroundColor: colors.whisperWhite,
    marginTop: theme.spacing(2)
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
    padding: theme.spacing(0, 4)
  },
  boldHeading: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  footer: {
    margin: theme.spacing(6, 0)
  },
  centerVertical: { display: 'flex', alignItems: 'center' },
  iconWrapper: { display: 'flex', justifyContent: 'center' }
}));

const Rituals = (props: Props) => {
  const [helpModal, setHelpModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [orderBy, setOrderBy] = useState('asc');

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { companyId, teamId } = useParams<ParamTypes>();

  const rituals = useSelector((state: RootStateOrAny) => state.rituals.data);

  useEffect(() => {
    dispatch(getRituals(teamId));
  }, []);

  const handleOrderBy = (event: React.ChangeEvent<{ value: unknown }>) => {
    setOrderBy(event.target.value as string);
  };

  const handleDelete = () => {
    dispatch(deleteRitual(deleteId));
    setDeleteModal(false);
  };
  const renderListItem = ({ id, action, trigger, teamId }: any) => {
    return (
      <Grid container item key={id} className={classes.centerVertical}>
        <Grid
          container
          direction='row'
          item
          xs={11}
          className={classes.listContainer}
        >
          <Grid item xs={5} className={classes.centerVertical}>
            <Typography variant='h4' className={classes.listTitle}>
              {trigger}
            </Typography>
          </Grid>
          <Grid container item xs={7} className={classes.centerVertical}>
            <Grid item xs={10}>
              <Typography variant='h4' className={classes.listTitle}>
                {action}
              </Typography>
            </Grid>
            <Grid item xs={2} className={classes.editIcon}>
              <NavLink
                to={{
                  pathname: `/${companyId}/ritual/edit/${id}`,
                  state: { id, action, trigger, teamId }
                }}
              >
                <IconButton>
                  <CreateOutlinedIcon style={{ color: colors.royalBlue }} />
                </IconButton>
              </NavLink>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1} className={classes.iconWrapper}>
          <IconButton
            onClick={() => {
              setDeleteId(id);
              setDeleteModal(true);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
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
          variant='contained'
          className={classes.button}
          onClick={() => history.push(`/${companyId}/${teamId}/ritual/add`)}
        >
          Create a new ritual
        </Button>
        <Link
          startIcon={<HelpOutlineIcon color={'primary'} />}
          onClick={() => setHelpModal(true)}
        >
          <Typography variant='h4' className={classes.link}>
            More
          </Typography>
        </Link>
      </ButtonDiv>

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

      <ModalComponent
        open={helpModal}
        icon={true}
        title='Create new ritual'
        message='Let your team agree on rituals which you want to do regularly. You can update, delete or create a new one depend on what works for your team.'
        buttonTitle='Close'
        onClose={() => setHelpModal(false)}
      />

      <ModalComponent
        open={deleteModal}
        // open={true}
        icon={false}
        type='confirm'
        title='Do you really want to delete this ritual?'
        onClose={() => setDeleteModal(false)}
        yesClickTitle='Yes'
        noClickTitle='No'
        onYesClick={handleDelete}
        onNoClick={() => setDeleteModal(false)}
      />
    </RootDiv>
  );
};

export default Rituals;
