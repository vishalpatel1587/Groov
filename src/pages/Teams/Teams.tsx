import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  useHistory,
  useParams,
  useLocation,
  useRouteMatch,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { NavLink } from '../../components/NavLink';
import { RitualsHeaderPropts } from '../../prompts/prompts';
import { RoutPath } from '../../types/routes';
import {
  Loader,
  Card,
  Button,
  Pagination,
  ModalComponent,
  SelectMenu,
  Link
} from '../../components';
import { colors } from '../../styling/styles/colors';
import {
  getTeamsByCompanyId,
  getCompanyRitualByCompanyId,
  getCompanyById
} from '../../store/actions/actions';

interface Props {}

interface ParamTypes {
  companyId: string;
}

const RootDiv = styled.div`
  // margin: 0 20%;
  padding-bottom: 30px;
  max-width: 60vw;
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
  description: { marginBottom: theme.spacing(6) },
  descriptionWithLink: { display: 'flex', justifyContent: 'center' },
  link: {
    color: colors.royalBlue,
    fontFamily: 'Averta-Semibold',
    fontWeight: 500
  },
  listTitleName: {
    paddingRight: theme.spacing(6),
    wordBreak: 'break-word',
    hyphens: 'auto'
  },
  sponserRole: {
    color: colors.slateGrey2,
    fontSize: 14
  },
  executiveSponser: {
    color: colors.slateGrey2,
    fontSize: 14
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
    padding: theme.spacing(4, 6, 4, 4),
    marginTop: theme.spacing(2),
    borderRadius: theme.spacing(3),
    backgroundColor: colors.whisperWhite,
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
    color: colors.darkGrey
  },
  listHeading: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 0.5)
  },
  listItemBorder: {
    width: '100%'
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
    margin: theme.spacing(6, 0)
  },
  ritualsContainer: {
    '&>:not(:last-child)': {
      borderBottom: '2px solid',
      borderBottomColor: colors.mysticGrey,
      paddingBottom: theme.spacing(3),
      marginBottom: theme.spacing(3)
    }
  },
  tabbar: {
    padding: theme.spacing(5),
    color: colors.darkGrey
  },
  tabbarTitle: {
    fontFamily: ['Averta', 'Helvetica'].join(','),
    fontWeight: 500,
    color: colors.darkGrey
  },
  headerMenu: {
    marginTop: 24,
    marginBottom: 12,
    display: 'flex',
    flex: 3,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  }
}));
const pageLimit = 5;
//const TABS = ['Company Rituals', 'Team Rituals']
const Teams = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [companyPage, setCompanyPage] = useState(1);
  const [compnayOffset, setCompanyOffset] = useState(0);
  const [orderBy, setOrderBy] = useState('asc');
  const [orderCompanyBy, setCompanyOrderBy] = useState('asc');
  const [activeTab, setActiveTab] = useState('CompanyRitual');
  let { url } = useRouteMatch();
  const classes = useStyles(props);
  const history = useHistory();
  const dispatch = useDispatch();
  const { companyId } = useParams<ParamTypes>();
  const teams = useSelector((state: RootStateOrAny) => state.teams);
  const company = useSelector((state: RootStateOrAny) => state.company);
  const location = useLocation();

  useEffect(() => {
    dispatch(getCompanyById(companyId));
  }, []);
  useEffect(() => {
    if (location.pathname === '/mentemia/compnay_rituals') {
      setActiveTab('CompanyRitual');
    }
    if (location.pathname === '/mentemia/team_rituals') {
      setActiveTab('TeamRitual');
    }
  }, [location.pathname]);

  useEffect(() => {
    dispatch(getTeamsByCompanyId(pageLimit, offset, orderBy, companyId));
  }, [offset, orderBy]);

  useEffect(() => {
    dispatch(
      getCompanyRitualByCompanyId(
        pageLimit,
        compnayOffset,
        orderCompanyBy,
        companyId
      )
    );
  }, [compnayOffset, orderCompanyBy]);

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
  const handleCompanyPage = (currentPage: any) => {
    if (currentPage === 'Next') {
      setCompanyPage(companyPage + 1);
      setCompanyOffset(compnayOffset + pageLimit);
    } else if (currentPage === 'Prev') {
      setCompanyPage(companyPage - 1);
      setCompanyOffset(compnayOffset - pageLimit);
    } else {
      setCompanyPage(currentPage);
      setCompanyOffset((currentPage - 1) * pageLimit);
    }
  };

  const handleOrderBy = (event: React.ChangeEvent<{ value: unknown }>) => {
    setOrderBy(event.target.value as string);
  };

  const renderTeamsListItem = ({ id, name, rituals }: any, keyId: number) => {
    return (
      <Grid
        container
        direction='row'
        key={'team' + keyId}
        item
        xs={12}
        className={classes.listContainer}
        // onClick={() => history.push(`/${companyId}/${id}/rituals`)}
      >
        <Grid item xs={3}>
          <Typography variant='h3' className={classes.listTitleName}>
            {name}
          </Typography>
        </Grid>
        <Grid container item xs={9} className={classes.ritualsContainer}>
          {rituals.map(({ id, trigger, action }: any, index: number) => (
            <Box
              display='flex'
              flexDirection='row'
              justifyContent='space-between'
              className={classes.listItemBorder}
              key={'ritual' + index}
            >
              <Grid item xs={5}>
                <Typography variant='h4' className={classes.listTitle}>
                  {trigger}
                </Typography>
              </Grid>

              <Grid item xs={5}>
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
  const renderCompnayListItem = (
    { id, sponsorName, sponsorRole, rituals }: any,
    keyId: number
  ) => {
    return (
      <Grid
        container
        direction='row'
        key={'team' + keyId}
        item
        xs={12}
        className={classes.listContainer}
        // onClick={() => history.push(`/${companyId}/${id}/rituals`)}
      >
        <Grid item xs={3}>
          <Typography variant='h4' className={classes.listTitle}>
            {sponsorName}
          </Typography>
          <Typography variant='h6' className={classes.sponserRole}>
            {sponsorRole}
          </Typography>
        </Grid>
        <Grid container item xs={9} className={classes.ritualsContainer}>
          {rituals.map(({ id, comments, actionPlan }: any, index: number) => (
            <Box
              display='flex'
              flexDirection='row'
              justifyContent='space-between'
              className={classes.listItemBorder}
              key={'ritual' + index}
            >
              <Grid item xs={5}>
                <Typography variant='h4' className={classes.listTitle}>
                  {comments}
                </Typography>
              </Grid>

              <Grid item xs={5}>
                <Typography variant='h4' className={classes.listTitle}>
                  {actionPlan}
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
  const totalCompanyPageCount = teams.companyRituals
    ? Math.ceil(teams.companyRituals.total / teams.companyRituals.limit)
    : 0;
  const teamRituals = () => {
    return (
      <Card>
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          className={classes.cardHeader}
        >
          <Typography variant='h2' component='h5' gutterBottom>
            Teams and rituals
          </Typography>
        </Grid>

        {teams?.data?.teams?.length > 0 ? (
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
                <Typography variant='h4' className={classes.boldHeading}>
                  Triggers
                </Typography>
              </Grid>
              <Grid container item xs={4} className={classes.listHeading}>
                <Typography variant='h4' className={classes.boldHeading}>
                  Actions
                </Typography>
              </Grid>

              {teams?.data?.teams?.map((items: any, index: number) =>
                renderTeamsListItem(items, index)
              )}
            </Grid>
            {totalPageCount && (
              <Pagination
                count={totalPageCount}
                page={page}
                onChange={(p) => handlePage(p)}
              />
            )}
          </>
        ) : (
          <>
            {teams.loading ? (
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
    );
  };
  const companyRituals = () => {
    return (
      <Card>
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          className={classes.cardHeader}
        >
          <Typography variant='h2' component='h5'>
            Company Ritual
          </Typography>
        </Grid>

        {teams?.companyRituals?.companyRituals?.length > 0 ? (
          <>
            <Grid container>
              <Grid container item xs={3} className={classes.listHeading}>
                <Typography variant='h4' className={classes.boldHeading}>
                  Executive Sponser
                </Typography>
              </Grid>
              <Grid container item xs={5} className={classes.listHeading}>
                <Typography variant='h4' className={classes.boldHeading}>
                  Triggers
                </Typography>
              </Grid>
              <Grid container item xs={4} className={classes.listHeading}>
                <Typography variant='h4' className={classes.boldHeading}>
                  Actions
                </Typography>
              </Grid>

              {teams?.companyRituals?.companyRituals?.map(
                (items: any, index: number) =>
                  renderCompnayListItem(items, index)
              )}
            </Grid>
            {totalCompanyPageCount > 1 && (
              <Pagination
                count={totalCompanyPageCount}
                page={companyPage}
                onChange={(p) => handleCompanyPage(p)}
              />
            )}
          </>
        ) : (
          <>
            {teams.loading ? (
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
    );
  };

  return (
    <RootDiv>
      <Typography variant='h1' component='h1' gutterBottom align='center'>
        {company.name || 'NO SUCH COMPANY ID EXIST!!'}
        {console.log('company', company.name)}
      </Typography>
      <Typography
        variant='body2'
        gutterBottom
        align='center'
        className={classes.description}
      >
        A simple way to bake wellbeing into your workplace is to create rituals
        for team wellbeing. The idea is to link a wellbeing action, like group
        deep breathing, to something in your work day (a trigger), such as a
        regular meeting. In this way, wellbeing becomes an automatic part of
        every day.
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
      <Typography
        variant='body2'
        gutterBottom
        align='center'
        className={classes.description}
      >
        Teams at your company are creating and sharing their rituals. Science
        shows that recording and sharing these commitments will help make them
        stick.
      </Typography>
      <Typography
        variant='body2'
        gutterBottom
        align='center'
        className={classes.descriptionWithLink}
      >
        Click below to create some for your team.
      </Typography>
      <ButtonDiv>
        <Button
          className={classes.button}
          onClick={() => history.push(`/${companyId}/teams/add`)}
          variant='contained'
        >
          Add a new team
        </Button>
        <Button
          className={classes.buttonMore}
          variant='contained'
          onClick={() => setOpen(true)}
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
      </ButtonDiv>
      {open && (
        <ModalComponent
          open={open}
          icon={true}
          title='Add a new team'
          message="Do this if you haven't yet created your team and recorded your team's rituals."
          secondMessage="If you've already created your team, view or update your team's rituals via the unique link that would've been emailed to you."
          buttonTitle='Close'
          onClose={() => setOpen(false)}
        />
      )}
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='center'
        className={classes.headerMenu}
      >
        <NavLink to={`${url}/${RoutPath.CompanyRituals}`}>
          {RitualsHeaderPropts.ritualsHead.companyRituals}
        </NavLink>
        <NavLink to={`${url}/${RoutPath.TeamRituals}`}>
          {RitualsHeaderPropts.ritualsHead.teamRituals}
        </NavLink>
      </Grid>
      {activeTab === 'CompanyRitual' && companyRituals()}
      {activeTab === 'TeamRitual' && teamRituals()}
      <Switch>
        <Route path='/'>
          <Redirect to={`${url}/${RoutPath.CompanyRituals}`} />
        </Route>
      </Switch>
    </RootDiv>
  );
};

export default Teams;
function setSelectedTab(newValue: number) {
  throw new Error('Function not implemented.');
}
