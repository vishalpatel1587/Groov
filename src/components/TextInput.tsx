import { TextField } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { colors } from '../styling/styles/colors';

export const defaultTextInputStyle = (theme:Theme) => ({
  root: {
    marginTop: theme.spacing(4)
  },
  inputRoot: {
    borderRadius: theme.spacing(8),
    borderColor: colors.mysticGrey,
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    backgroundColor: 'white'
  },
  inner: {
    borderRadius: '0 !important'
  }

});

const useDefaultTextInputStyles = makeStyles(defaultTextInputStyle);

export const Input = ({ InputProps = {}, ...other }) => {
  const classes = useDefaultTextInputStyles();
  const props = {
    classes: {
      root: classes.inputRoot,
      input: classes.inner
    },
    ...InputProps
  };

  return (
    <TextField
      className={classes.root}
      variant='outlined'
      InputProps={props}
      {...other}
    />
  );
};
