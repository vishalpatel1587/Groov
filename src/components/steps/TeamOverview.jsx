import { makeStyles, Typography } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import React from 'react';
import styled from 'styled-components';
import { colors } from '../../styling/styles/colors';
import { Button } from '../Button';
import { Link } from '../Link';
// import { Modal } from '../Modal';
import { useHistory } from 'react-router-dom';

const RootDiv = styled.div`
  text-align: center;
  margin: 0 20%;
`;

const ButtonDiv = styled.div`
  display: flex;
  padding-left: 35%;
  align-items: baseline;
`;

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(10),
    marginRight: '5vh'
  },
  link: {
    color: colors.royalBlue,
    fontFamily: 'Averta-Semibold',
    fontWeight: 500
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
  }
}));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

const getModalStyle = () => {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
};

const TeamOverview = () => {
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const history = useHistory();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id='simple-modal-title'>Text in a modal</h2>
      <p id='simple-modal-description'>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
    </div>
  );

  return (
    <RootDiv>
      <Typography variant='h1' component='h1' gutterBottom>
        NZ POST
      </Typography>
      <Typography variant='body2' gutterBottom>
        A simple way to bake wellbeing into your workplace is to create rituals
        for team wellbeing.The idea is to link a wellbeing action, like group
        deep breathing, to something in your work day (a trigger), such as a
        regular meeting. In this way, wellbeing becomes an automatic part of
        every day.
      </Typography>
      <ButtonDiv>
        <Button
          className={classes.button}
          onClick={() => history.push('/addteams')}
        >
          Add a new team
        </Button>

        <Link
          style={{ padding: 0 }}
          startIcon={<HelpOutlineIcon color={'primary'} />}
          className={classes.linkButton}
        >
          <Typography
            variant='h4'
            className={classes.link}
            onClick={handleOpen}
          >
            Help
          </Typography>
        </Link>
      </ButtonDiv>
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}
      </Modal> */}
    </RootDiv>
  );
};

export default TeamOverview;
