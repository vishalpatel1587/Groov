import { makeStyles } from '@material-ui/core/styles';
import { usePagination } from '@material-ui/lab/Pagination';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Typography, Grid, Button, Hidden } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import { colors } from '../styling/styles/colors';

const BUTTON_HEIGHT = 40;
const MOBILE_BUTTON_HEIGHT = 28;

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 40,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0)
    }
  },
  ul: {
    listStyle: 'none',
    padding: theme.spacing(0),
    margin: theme.spacing(0),
    display: 'flex',
    justifyContent: 'center'
  },
  pageTypeWrapper: {
    display: 'flex'
  },
  page: {
    height: BUTTON_HEIGHT,
    width: BUTTON_HEIGHT,
    borderRadius: BUTTON_HEIGHT / 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: 0,
    [theme.breakpoints.down('sm')]: {
      height: MOBILE_BUTTON_HEIGHT,
      width: MOBILE_BUTTON_HEIGHT,
      borderRadius: MOBILE_BUTTON_HEIGHT / 2,
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0)
    }
  },
  pageActive: {
    backgroundColor: colors.blue,
    '&:hover': {
      background: theme.palette.primary.main
    }
  },
  pageDot: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      height: BUTTON_HEIGHT
    }
  },
  pageText: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    color: colors.slateGrey,
    textTransform: 'none'
  }
}));

interface PaginationProps {
  count: number;
  page: number;
  onChange: (page: number | 'Next' | 'Prev') => void;
}
export const Pagination = (props: PaginationProps) => {
  const classes = useStyles();
  const { items } = usePagination({
    count: props.count,
    page: props.page
  });

  const renderPageNumber = (number: number, selected: boolean) => (
    <Button
      className={`${selected ? classes.pageActive : ''} ${classes.page}`}
      onClick={() => props.onChange(number)}
    >
      <Typography
        variant='h4'
        style={{ color: selected ? colors.white : colors.darkGrey }}
      >
        {number}
      </Typography>
    </Button>
  );

  return (
    <Grid
      container
      direction='row'
      justifyContent='center'
      alignItems='center'
      className={classes.container}
    >
      <Grid item xs={2}>
        {props.page > 1 && (
          <Button
            className={classes.pageTypeWrapper}
            onClick={() => props.onChange('Prev')}
          >
            <ArrowBackIosIcon htmlColor={colors.slateGrey} />
            <Hidden xsDown>
              <Typography variant='h4' className={classes.pageText}>
                Prev
              </Typography>
            </Hidden>
          </Button>
        )}
      </Grid>

      <Grid item xs={8}>
        <ul className={classes.ul}>
          {items.map(({ page, type, selected, ...item }, index) => {
            let children = null;

            if (type === 'start-ellipsis' || type === 'end-ellipsis') {
              children = <div className={classes.pageDot}>...</div>;
            } else if (type === 'page') {
              children = renderPageNumber(page, selected);
            }
            return <li key={index}>{children}</li>;
          })}
        </ul>
      </Grid>

      <Grid item xs={2}>
        {props.count !== props.page && (
          <Button
            className={classes.pageTypeWrapper}
            onClick={() => props.onChange('Next')}
          >
            <Hidden xsDown>
              <Typography variant='h4' className={classes.pageText}>
                Next
              </Typography>
            </Hidden>
            <ArrowForwardIosIcon htmlColor={colors.slateGrey} />
          </Button>
        )}
      </Grid>
    </Grid>
  );
};
