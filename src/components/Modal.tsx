import Modal from '@material-ui/core/Modal';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import { Button } from './Button';
import { colors } from '../styling/styles/colors';

interface Props {
  open: boolean;
  icon: boolean;
  title: string;
  type?: string;
  message?: string;
  buttonTitle?: string;
  noClickTitle?: string;
  yesClickTitle?: string;
  secondMessage?: string;
  onClose?: () => void;
  onNoClick?: () => void;
  onYesClick?: () => void;
}
const useStyles = makeStyles((theme) => ({
  modalButton: {
    marginTop: theme.spacing(4)
  },
  paper: {
    position: 'absolute',
    width: 280,
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 4, 3),
    borderRadius: theme.spacing(6),
    top: '30%',
    margin: 'auto',
    zIndex: 100
  },
  icon: {
    width: 30,
    height: 30,
    margin: theme.spacing(4, 0),
    color: colors.white,
    backgroundColor: colors.royalBlue,
    padding: theme.spacing(4),
    borderRadius: 50
  },
  modal: { display: 'flex', alignItems: 'center', justifyContent: 'center' }
}));

export const ModalComponent = (props: Props) => {
  const classes = useStyles();

  return (
    <Modal open={props.open} className={classes.modal} onClose={props.onClose}>
      <div className={classes.paper}>
        {props.icon && <HelpOutlineIcon className={classes.icon} />}
        <Typography variant='h2' component='h2'>
          {props.title}
        </Typography>
        <br />
        <Typography variant='body1'>{props.message}</Typography>
        <br />
        <Typography variant='body1'>{props.secondMessage}</Typography>
        {props.buttonTitle && (
          <Button
            className={classes.modalButton}
            onClick={props.onClose}
            variant='contained'
          >
            {props.buttonTitle}
          </Button>
        )}
        {props.type === 'confirm' && (
          <Box display='flex' justifyContent='space-evenly'>
            <Button
              className={classes.modalButton}
              onClick={props.onYesClick}
              variant='outlined'
            >
              {props.yesClickTitle}
            </Button>
            <Button
              className={classes.modalButton}
              onClick={props.onClose}
              variant='contained'
            >
              {props.noClickTitle}
            </Button>
          </Box>
        )}
      </div>
    </Modal>
  );
};


