import React from 'react';
import MaterialButton from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { colors } from '../styling/styles/colors';

interface ButtonProps {
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  variant?: 'outlined' | 'contained';
  style?:object;
}

const CustomButton = withStyles((theme) => ({
  root: {
    padding: theme.spacing(4, 10),
    borderRadius: theme.spacing(8),
    textTransform: 'none',
    fontWeight: 'bold'
  }
}))(MaterialButton);

const Button: React.FC<ButtonProps> = ({ className, disabled, children,variant,style,onClick }) => {
  return (
    <CustomButton
      className={className}
      disableElevation
      color='primary'
      style={{
        backgroundColor: disabled ? colors.gray1 : '',
        color: disabled ? colors.white : '',
        ...style
      }}
      variant={variant}
      onClick={onClick}
      
    >
      {children}
    </CustomButton>
  );
};

export { Button };
