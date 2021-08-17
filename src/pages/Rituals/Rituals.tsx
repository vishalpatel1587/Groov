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
  Button,
  SelectMenu,
  ModalComponent,
  Link
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
  margin: 2em 0;
`;

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(3)
  },
  buttonMore: {
    backgroundColor: 'transparent',
    color: colors.royalBlue,
    padding: theme.spacing(4),
    '&:hover': {
      background: colors.royalBlueHover
    }
  },
  descriptionWithLink: { display: 'flex', justifyContent: 'center' },
  description: { marginBottom: theme.spacing(6) },
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
  listTitleBold: {
    fontFamily: 'Averta',
    fontWeight: 'bold',
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

  const rituals = useSelector((state: RootStateOrAny) => state.rituals);
  console.log('===============', rituals);
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
  const renderListItem = (
    { id, action, trigger, teamId }: any,
    index: number
  ) => {
    return (
      <Grid
        container
        item
        key={'rt' + index}
        className={classes.centerVertical}
      >
        <Grid
          container
          direction='row'
          item
          xs={11}
          className={classes.listContainer}
        >
          <Grid item xs={5} className={classes.centerVertical}>
            <Typography variant='h4' className={classes.listTitleBold}>
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
        {rituals?.rituals?.name}
      </Typography>
      <Typography
        variant='body2'
        gutterBottom
        align='center'
        className={classes.description}
      >
        This is where you can record the rituals for your team. These can be
        viewed by the rest of the organisation, inspiring them to create ones of
        their own. Science also shows that recording and sharing commitments
        will help to make them stick.
      </Typography>
      <Typography
        variant='body2'
        gutterBottom
        align='center'
        className={`${classes.description} ${classes.descriptionWithLink}`}
      >
        <Link href={`/${companyId}/ideas`}>
          <Typography variant='h4' className={classes.link}>
            Click Here
          </Typography>
        </Link>{' '}
        to spark ideas about triggers and actions suitable for your team.
      </Typography>

      <ButtonDiv>
        <Button
          variant='contained'
          className={classes.button}
          onClick={() => history.push(`/${companyId}/${teamId}/ritual/add`)}
        >
          Create a new ritual
        </Button>
        <Button
          className={classes.buttonMore}
          variant='contained'
          onClick={() => setHelpModal(true)}
        >
          <Box
            width={70}
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <HelpOutlineIcon color={'primary'} />
            <Typography variant='h4' className={classes.link}>
              More
            </Typography>
          </Box>
        </Button>
        {/* <Link
          startIcon={<HelpOutlineIcon color={'primary'} />}
          onClick={() => setHelpModal(true)}
        >
          <Typography variant='h4' className={classes.link}>
            More
          </Typography>
        </Link> */}
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
        {rituals?.data?.length > 0 ? (
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
              <Typography variant='h4' className={classes.boldHeading}>
                {' '}
                Triggers
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.listHeading}>
              <Typography variant='h4' className={classes.boldHeading}>
                Actions
              </Typography>
            </Grid>
            {rituals?.data?.map((items: any, index: number) =>
              renderListItem(items, index)
            )}
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
