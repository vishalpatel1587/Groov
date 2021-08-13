import React from 'react';
import MaterialButton from '@material-ui/core/Button';
import cancelIcon from '../../assets/icons/ic-cancel.svg';

type CloseToasterButtonProps = {
  onClick: () => void;
};

export const CloseToasterButton = ({ onClick }: CloseToasterButtonProps) => {
  return (
    <MaterialButton
      onClick={onClick}
      // inline to override Material-UI's styles
      style={{
        minWidth: 24,
        height: 24
      }}
    >
      <img src={cancelIcon} alt='toastImg' />
    </MaterialButton>
  );
};
