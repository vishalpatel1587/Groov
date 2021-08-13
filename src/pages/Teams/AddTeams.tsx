import React, { useState } from 'react';
import styled from 'styled-components';
import { makeStyles, Typography } from '@material-ui/core';
import { Card } from '../../components/Card';
import { Input } from '../../components/TextInput';
import { Button } from '../../components/Button';
import { colors } from '../../styling/styles/colors';
import { Link } from '../../components/Link';
import ModalComponent from '../../components/Modal';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import { createTeam } from '../../store/actions/actions';
import { validateEmail, validateName } from '../../utils/validation';
import { ToasterUtils } from '../../components/Toaster/ToasterUtils';
interface Props {}
interface ParamTypes {
  companyId: string;
}

const RootDiv = styled.div`
  margin: 0 0%;
  max-width: 600px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

const InputDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0px;
`;

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(10)
  },
  link: {
    color: colors.royalBlue,
    fontFamily: 'Averta-Semibold',
    fontWeight: 500
  },
  linkButton: {
    alignSelf: 'center',
    margin: theme.spacing(1)
  },
  card: { marginTop: '2em' },
  input: {
    width: theme.spacing(125),
    marginLeft: theme.spacing(5)
  },
  input2: {
    width: theme.spacing(160),
    marginLeft: theme.spacing(5)
  }
}));
const AddTeams = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [leaderEmail, setLeaderEmail] = useState('');
  const [confirmLeaderEmail, setConfirmLeaderEmail] = useState('');
  const [action, setAction] = useState('');
  const [trigger, setTrigger] = useState('');

  const team = useSelector((state: RootStateOrAny) => state.teams.createTeam);

  const classes = useStyles();
  const dispatch = useDispatch();
  const { companyId } = useParams<ParamTypes>();

  const handleSubmit = () => {
    const team = { name, leaderEmail, companyId, };
    const ritual = { action, trigger }
    const data = {team,ritual}

    if (validateName(name)) {
      if (validateEmail(leaderEmail)) {
        if (leaderEmail === confirmLeaderEmail) {
          if (action !== '' && trigger !== '') {
            dispatch(createTeam(data));
          } else {
            ToasterUtils.error(`Action or trigger can't be empty!!`);
          }
        } else {
          ToasterUtils.error('The email address does not match');
        }
      } else {
        ToasterUtils.error('Check email format');
      }
    } else {
      ToasterUtils.error('Enter Team Name');
    }
  };

  return (
    <RootDiv>
      <Typography variant='h1' component='h1' gutterBottom align='center'>
        Add a new team
      </Typography>
      <Typography variant='body2' gutterBottom align='center'>
        Your team is a place for you and your team to look at commited rituals.
        After creating a team you will recieve and email with unique link to
        your 'Team page'. Only your team can commited rituals containing
        triggers and actions.
      </Typography>

      <Card className={classes.card}>
        <Typography variant='h2' component='h1' gutterBottom align='center'>
          Fill your team name and create first ritual.
        </Typography>
        <Input
          fullWidth={true}
          name='name'
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          placeholder='Team name'
        />
        <Input
          fullWidth={true}
          name='leader_email'
          value={leaderEmail}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLeaderEmail(e.target.value)
          }
          placeholder='Leader email'
        />
        <Input
          fullWidth={true}
          name='confirm_leader_email'
          value={confirmLeaderEmail}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmLeaderEmail(e.target.value)
          }
          placeholder='Confirm leader email'
        />
        <br />
        <br />
        <Typography variant='h2' component='h1' gutterBottom align='center'>
          Commit first ritual
        </Typography>
        <InputDiv>
          <Typography variant='h3' component='h1'>
            The team aggres that
          </Typography>
          <Input
            className={classes.input}
            name='trigger'
            value={trigger}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTrigger(e.target.value)
            }
            placeholder='Trigger example: At the beginning of every meeting'
          />
        </InputDiv>
        <InputDiv>
          <Typography variant='h3'>we will</Typography>
          <Input
            className={classes.input}
            name='action'
            value={action}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAction(e.target.value)
            }
            placeholder='Action example: Share one thing you did well, one thing you learned, and one thing you want to improve'
            multiline={true}
            rows={2}
          />
        </InputDiv>
        <InputDiv>
          <Typography variant='h3'>
            to make wellbeing ritual automatic part of our day.
          </Typography>
        </InputDiv>
        {open && (
          <ModalComponent
            open={open}
            icon={false}
            title="Great, you've created a new team!"
            message="To add your first ritual, check your email for the special link that we've sent."
            buttonTitle='OK'
            onButtonClick={() => setOpen(false)}
          ></ModalComponent>
        )}
        <ButtonDiv>
          <Button className={classes.button} onClick={handleSubmit}>
            {team.loading ? <Loader /> : `Save`}
          </Button>
        </ButtonDiv>
        <ButtonDiv>
          <Link className={classes.linkButton}>
            <Typography variant='h4' className={classes.link}>
              Cancel
            </Typography>
          </Link>
        </ButtonDiv>
      </Card>
    </RootDiv>
  );
};

export default AddTeams;
