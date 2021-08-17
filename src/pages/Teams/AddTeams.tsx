import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles, Typography } from '@material-ui/core';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import {
  Loader,
  Link,
  Card,
  Button,
  Input,
  ModalComponent,
  ToasterUtils
} from '../../components';
import { colors } from '../../styling/styles/colors';
import { createTeam } from '../../store/actions/actions';
import { validateEmail, validateName } from '../../utils/validation';

interface Props {}

interface ParamTypes {
  companyId: string;
}

const RootDiv = styled.div`
  margin: 0 0%;
  padding-bottom: 30px;
  max-width: 750px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

const InputDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 25px 0px;
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
    marginTop: theme.spacing(0)
  },
  inputRowText: {
    float: 'left',
    minWidth: 'fit-content',
    marginRight: theme.spacing(3)
  },
  description: { marginBottom: theme.spacing(6) },
  withLink: { display: 'flex', justifyContent: 'center' }
}));
const AddTeams = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [leaderEmail, setLeaderEmail] = useState('');
  const [confirmLeaderEmail, setConfirmLeaderEmail] = useState('');
  const [action, setAction] = useState('');
  const [trigger, setTrigger] = useState('');
  const history = useHistory();

  const team = useSelector((state: RootStateOrAny) => state.teams);

  const classes = useStyles();
  const dispatch = useDispatch();
  const { companyId } = useParams<ParamTypes>();

  const handleSubmit = () => {
    const team = { name, leaderEmail, companyId };
    const ritual = { action, trigger };
    const data = { ...team, ritual };

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
      <Typography
        variant='body2'
        gutterBottom
        align='center'
        className={classes.description}
      >
        This is where you can record the rituals for your team. These can be
        viewed by the rest of the organisation, inspiring them to create ones of
        their own. Science also shows that recording and sharing commitments
        will help to make them stick.
      </Typography>
      <Typography
        variant='body2'
        gutterBottom
        align='center'
        className={classes.description}
      >
        When you save the first ritual, you'll receive an email with a unique
        link to this page so that you can view and update these rituals. You can
        share this link with your team.
      </Typography>
      <Typography
        variant='body2'
        gutterBottom
        align='center'
        className={`${classes.description} ${classes.withLink}`}
      >
        <Link href={`/${companyId}/ideas`}>
          <Typography variant='h4' className={classes.link}>
            Click here
          </Typography>
        </Link>{' '}
        to spark ideas about triggers and actions suitable for your team.
      </Typography>
      <Card className={classes.card}>
        <Typography variant='h2' component='h1' gutterBottom align='center'>
          Team information
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
          placeholder='Your email'
        />
        <Input
          fullWidth={true}
          name='confirm_leader_email'
          value={confirmLeaderEmail}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmLeaderEmail(e.target.value)
          }
          placeholder='Confirm your email'
        />
        <br />
        <br />
        <Typography variant='h2' component='h1' gutterBottom align='center'>
          The first team ritual
        </Typography>
        <InputDiv>
          <Typography
            variant='h3'
            component='h1'
            className={classes.inputRowText}
          >
            Trigger:
          </Typography>
          <Input
            fullWidth={true}
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
          <Typography variant='h3' className={classes.inputRowText}>
            Action:
          </Typography>
          <Input
            fullWidth={true}
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
        {open && (
          <ModalComponent
            open={open}
            icon={false}
            title="Great, you've created a new team!"
            message="To add your first ritual, check your email for the special link that we've sent."
            buttonTitle='OK'
            onClose={() => setOpen(false)}
          ></ModalComponent>
        )}
        <ButtonDiv>
          <Button
            className={classes.button}
            onClick={handleSubmit}
            variant='contained'
          >
            {team?.createTeam?.loading ? <Loader /> : `Commit`}
          </Button>
        </ButtonDiv>
        <ButtonDiv>
          <Button className={classes.linkButton} onClick={history.goBack}>
            <Typography variant='h4' className={classes.link}>
              Cancel
            </Typography>
          </Button>
        </ButtonDiv>
      </Card>
    </RootDiv>
  );
};

export default AddTeams;
