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
}

const CustomButton = withStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 12),
    borderRadius: theme.spacing(8),
    textTransform: 'none',
    fontWeight: 'bold'
  }
}))(MaterialButton);

const Button: React.FC<ButtonProps> = ({ className, disabled, children,variant,onClick }) => {
  return (
    <CustomButton
      className={className}
      disableElevation
      color='primary'
      style={{
        backgroundColor: disabled ? colors.gray1 : '',
        color: disabled ? colors.white : ''
      }}
      variant={variant}
      onClick={onClick}
    >
      {children}
    </CustomButton>
  );
};

export { Button };
