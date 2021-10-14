import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import {
  Loader,
  Card,
  Button,
  Pagination,
  ModalComponent,
  SelectMenu,
  Link,
  TabBar
} from '../../components';
import { colors } from '../../styling/styles/colors';
import {
  getCompanyById,
  getTeamsByCompanyId
} from '../../store/actions/actions';

interface Props { }

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
    padding: theme.spacing(0, 4)
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
    color: colors.darkGrey,
  },
  tabbarTitle: {
    fontFamily: ['Averta','Helvetica'].join(','),
    fontWeight: 500,
    color: colors.darkGrey,
    
  },
}));
const pageLimit = 5;
const TABS = [ 'Company Rituals','Team Rituals']
const Teams = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [orderBy, setOrderBy] = useState('asc');
  const [selectedTab, setSelectedTab] = useState(0)

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
  const handleTabChange = (event: any, newValue: number) => {
    setSelectedTab(newValue);
  };

  const renderListItem = ({ id, name, rituals }: any, keyId: number) => {
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

  return (
    <RootDiv>
      <Typography variant='h1' component='h1' gutterBottom align='center'>
        {company.name || 'NO SUCH COMPANY ID EXIST!!'}
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
      <TabBar className={classes.tabbar} tabs={TABS} handleChange={handleTabChange} selectedTab={selectedTab} />
      {selectedTab === 0 && (
        <Card>
          <Grid
            container
            direction='row'
            justifyContent='space-between'
            className={classes.cardHeader}
          >
            <Typography variant='h2' component='h5' gutterBottom>
              Company Rituals
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
                  renderListItem(items, index)
                )}
              </Grid>

              <Pagination
                count={totalPageCount}
                page={page}
                onChange={(p) => handlePage(p)}
              />
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
      )}
      {selectedTab === 1 && (
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
                  renderListItem(items, index)
                )}
              </Grid>

              <Pagination
                count={totalPageCount}
                page={page}
                onChange={(p) => handlePage(p)}
              />
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
      )}

    </RootDiv>
  );
};

export default Teams;
