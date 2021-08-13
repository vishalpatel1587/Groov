import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MaterialButton from '@material-ui/core/Button';
import { colors } from '../styling/styles/colors';

const CustomButton = withStyles((theme) => ({
  root: {
    color: 'white',
    padding: theme.spacing(3, 12),
    background: theme.palette.primary.main,
    borderRadius: theme.spacing(8),
    textTransform: 'none',
    fontWeight: 'bold',
    '&:hover': {
      background: theme.palette.primary.main
    }
  }

}))(MaterialButton);

const Button = (props: any) => {
  return (
    <CustomButton
      className={props.className}
      {...props}
      style={{
        backgroundColor: props.disabled ? colors.gray1 : '',
        color: props.disabled ? colors.white : ''
      }}
    >
      {props.children}
    </CustomButton>
  );
};

export { Button };
