import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../styling/styles/colors';
import { Button } from '../../components/Button';
import { Link } from '../../components/Link';
import ModalComponent from '../../components/Modal';
import { useHistory, useParams } from 'react-router-dom';
import { Card } from '../../components/Card';
import { Pagination } from '../../components/Pagination';
import {
  getCompanyById,
  getTeamsByCompanyId
} from '../../store/actions/actions';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import SelectMenu from '../../components/Menu';
import Loader from '../../components/Loader';

interface Props {}
interface ParamTypes {
  companyId: string;
}

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
  linkButton: {
    margin: theme.spacing(1)
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  listContainer: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: 18,
    borderRadius: 12,
    paddingBottom: 18,
    backgroundColor: colors.whisperWhite,
    marginTop: 8,
    '&:hover': { backgroundColor: colors.whisperWhiteDark, cursor: 'pointer' }
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
  listHeading: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  },
  listTitleName: { paddingRight: theme.spacing(6) },
  listItemBorder: {
    width: '100%',
    borderBottom: '2px solid',
    borderBottomColor: colors.mysticGrey,
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  cardHeader: { marginBottom: theme.spacing(4) },
  selectMenu: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    '&:hover': { cursor: 'pointer' }
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
const pageLimit = 5;
const Teams = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [orderBy, setOrderBy] = useState('asc');

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { companyId } = useParams<ParamTypes>();
  const teams = useSelector((state: RootStateOrAny) => state.teams);
  const company = useSelector((state: RootStateOrAny) => state.company);

  useEffect(() => {
    dispatch(getCompanyById(companyId));
    dispatch(getTeamsByCompanyId(pageLimit, offset, orderBy, companyId));
  }, []);

  useEffect(() => {
    dispatch(getTeamsByCompanyId(pageLimit, offset, orderBy, companyId));
  }, [offset, orderBy]);

  const handlePage = (currentPage: any) => {
    if (currentPage === 'Next') {
      setPage(page + 1);
      setOffset(offset + pageLimit);
    } else if (currentPage === 'Prev') {
      setPage(page - 1);
      setOffset(offset - pageLimit);
    } else {
      setPage(currentPage);
      setOffset((currentPage - 1) * pageLimit);
    }
  };

  const handleOrderBy = (event: React.ChangeEvent<{ value: unknown }>) => {
    setOrderBy(event.target.value as string);
  };
  const renderListItem = ({ id, name, rituals }: any) => {
    return (
      <Grid
        container
        direction='row'
        key={id}
        item
        xs={12}
        className={classes.listContainer}
        onClick={() => history.push(`/company/${companyId}/${id}/rituals`)}
      >
        <Grid item xs={3}>
          <Typography variant='h3' className={classes.listTitleName}>
            {name}
          </Typography>
        </Grid>
        <Grid container item xs={9}>
          {rituals.map(({ id, trigger, action, teamId }: any) => (
            <Box
              display='flex'
              flexDirection='row'
              justifyContent='space-between'
              className={classes.listItemBorder}
              key={id}
            >
              <Grid item xs={6}>
                <Typography variant='h4' className={classes.listTitle}>
                  {trigger}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant='h4' className={classes.listTitle}>
                  {action}
                </Typography>
              </Grid>
            </Box>
          ))}
        </Grid>
      </Grid>
    );
  };
  const totalPageCount = teams.data
    ? Math.ceil(teams.data.total / teams.data.limit)
    : 0;

  teams.data.teams && console.log('teamsda dasd', teams.data.teams);
  return (
    <RootDiv>
      <Typography variant='h1' component='h1' gutterBottom align='center'>
        {company.name || '!WrongCompanyId!'}
      </Typography>
      <Typography variant='body2' gutterBottom align='center'>
        Teams at your company are creating and sharing their rituals. Science
        shows that recording and sharing these commitments will help make them
        stick.
      </Typography>
      <ButtonDiv>
        <Button
          className={classes.button}
          onClick={() => history.push(`/company/${companyId}/teams/add`)}
        >
          Add a new team
        </Button>
        <Link
          startIcon={<HelpOutlineIcon color={'primary'} />}
          className={classes.linkButton}
          onClick={() => setOpen(true)}
        >
          <Typography
            variant='h4'
            className={classes.link}
            onClick={() => setOpen(true)}
          >
            More
          </Typography>
        </Link>
      </ButtonDiv>
      {open && (
        <ModalComponent
          open={open}
          icon={true}
          title='Add a new team'
          message="Do this if you haven't yet created your team and recorded your team's rituals."
          secondMessage="If you've already created your team, view or update your team's rituals via the unique link that would've been emailed to you."
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
            Teams
          </Typography>
        </Grid>

        {teams.data.teams.length > 0 ? (
          <>
            <Grid container>
              <Grid container item xs={3} className={classes.listHeading}>
                <Typography variant='h4' className={classes.boldHeading}>
                  Sort{' '}
                  <SelectMenu
                    value={orderBy}
                    onChange={handleOrderBy}
                    items={[
                      { label: 'A - Z', value: 'asc' },
                      { label: 'Z - A', value: 'desc' }
                    ]}
                  />
                </Typography>
              </Grid>
              <Grid container item xs={5} className={classes.listHeading}>
                <Typography variant='h4'>Triggers</Typography>
              </Grid>
              <Grid container item xs={4} className={classes.listHeading}>
                <Typography variant='h4'>Actions</Typography>
              </Grid>

              {teams.data.teams?.map((items: any) => renderListItem(items))}
            </Grid>

            <Pagination
              count={totalPageCount}
              page={page}
              onChange={(p) => handlePage(p)}
            />
          </>
        ) : (
          <>
            {teams.data.loading ? (
              <Box p={10} display='flex' justifyContent='center'>
                <Loader color={colors.royalBlue} size={50} thickness={4} />
              </Box>
            ) : (
              <Box p={10}>
                <Typography variant='body1' component='h2' align='center'>
                  Watch this space
                </Typography>
                <Typography variant='body1' component='h2' align='center'>
                  No teams have been added yet.
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

export default Teams;
