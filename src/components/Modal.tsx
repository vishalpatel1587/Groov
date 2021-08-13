import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../styling/styles/colors';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { Box, Typography } from '@material-ui/core';
import { Button } from './Button';
import Modal from '@material-ui/core/Modal';
interface Props {
  open: boolean;
  icon: boolean;
  title: string;
  message: string;
  secondMessage?: string;
  buttonTitle: string;
  onButtonClick: any;
  onYesClick?: any;
  onNoClick?: any;
}
const useStyles = makeStyles((theme) => ({
  modalButton: {
    marginTop: theme.spacing(4)
  },
  paper: {
    position: 'absolute',
    width: 280,
    // height: 320,
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 4, 3),
    borderRadius: 25,
    top: '30%',
    margin: 'auto',
    zIndex: 100
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    color: colors.white,
    backgroundColor: colors.royalBlue,
    padding: 18,
    borderRadius: 50
  },
  modal: { display: 'flex', alignItems: 'center', justifyContent: 'center' }
}));

const ModalComponent = (props: Props) => {
  const classes = useStyles();

  return (
    <Modal
      open={props.open}
      className={classes.modal}
      onClose={props.onButtonClick}
    >
      <div className={classes.paper}>
        {props.icon && <HelpOutlineIcon className={classes.icon} />}
        <Typography variant='h2' component='h2'>
          {props.title}
        </Typography>
        <br />
        <Typography variant='body1'>{props.message}</Typography>
        <br />
        <Typography variant='body1'>{props.secondMessage}</Typography>
        <Button className={classes.modalButton} onClick={props.onButtonClick}>
          {props.buttonTitle}
        </Button>

        

        
      </div>
    </Modal>
  );
};

export default ModalComponent;
