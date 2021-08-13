import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { makeStyles, Typography } from '@material-ui/core';
import { Card } from '../../components/Card';
import { Input } from '../../components/TextInput';
import { Button } from '../../components/Button';
import { colors } from '../../styling/styles/colors';
import { Link } from '../../components/Link';
import { useLocation, useParams } from 'react-router-dom';
import ModalComponent from '../../components/Modal';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { createRitual, updateRitual } from '../../store/actions/actions';
import Loader from '../../components/Loader';
import { ToasterUtils } from '../../components/Toaster/ToasterUtils';

interface Props {}

interface ParamTypes {
  id: string;
  companyId: string;
  teamId: string;
}
const RootDiv = styled.div`
  text-align: center;
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
    margin: theme.spacing(1)
  },
  linkClickHere: {},
  subHeader: {
    marginBottom: theme.spacing(8)
  }
}));

const AddRitual = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const [actions, setActions] = useState('');
  const [triggers, setTriggers] = useState('');

  let { id, teamId } = useParams<ParamTypes>();
  const location = useLocation<any>();
  const dispatch = useDispatch();
  const classes = useStyles();
  const ritual = useSelector((state: RootStateOrAny) => state.rituals);

  useEffect(() => {
    if (id) {
      setTriggers(location.state.trigger);
      setActions(location.state.action);
    }
  }, []);

  const handleSubmit = () => {
    const createData = {
      action: actions,
      trigger: triggers,
      teamId: teamId
    };
    const updateData = { action: actions, trigger: triggers };

    if (actions !== '' && triggers !== '') {
      id
        ? dispatch(updateRitual(updateData, id))
        : dispatch(createRitual(createData));
    } else {
      ToasterUtils.error(`Action or trigger can't be empty!!`);
    }
  };

  return (
    <RootDiv>
      <Typography variant='h1' component='h1' gutterBottom>
        {id ? `Update ritual` : `Create new ritual`}
      </Typography>

      {id ? (
        <Typography variant='body2' gutterBottom className={classes.subHeader}>
          You can update existing ritual to fit better your team needs.
        </Typography>
      ) : (
        <>
          <Typography variant='body2' gutterBottom>
            By filling the trigger and action you will create team ritual.
            Ritual will be save on your team page.
          </Typography>
          <Typography
            variant='body2'
            gutterBottom
            className={classes.subHeader}
          >
            <Link className={classes.linkClickHere}>
              <Typography variant='h4' className={classes.link}>
                Click Here
              </Typography>
            </Link>{' '}
            to spark ideas about triggers and action suitable for your team
          </Typography>
        </>
      )}
      <Card>
        <InputDiv>
          <Typography variant='h3' component='h1'>
            The team aggres that
          </Typography>
          <Input
            fullWidth={true}
            name='triggers'
            value={triggers}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTriggers(e.target.value)
            }
            placeholder='Trigger example: At the beginning of every meeting'
          />
        </InputDiv>
        <InputDiv>
          <Typography variant='h3' component='h1'>
            we will
          </Typography>
          <Input
            fullWidth={true}
            name='actions'
            value={actions}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setActions(e.target.value)
            }
            placeholder='Action example: Share one thing you did well, one thing you learned, and one thing you want to improve'
            multiline={true}
            rows={2}
          />
        </InputDiv>
        <InputDiv>
          <Typography variant='h3' component='h1'>
            to make wellbeing ritual automatic part of our day.
          </Typography>
        </InputDiv>
        {open && (
          <ModalComponent
            open={open}
            icon={false}
            title='Yay! You have created new ritual'
            message='The summary of your rituals have been sent to your email or you can download them by clickling the icon in right top corner.'
            buttonTitle='OK'
            onButtonClick={() => setOpen(false)}
          />
        )}

        <ButtonDiv>
          <Button className={classes.button} onClick={handleSubmit}>
            {id ? (
              ritual.update.loading ? (
                <Loader />
              ) : (
                `Update`
              )
            ) : ritual.create.loading ? (
              <Loader />
            ) : (
              `Commit`
            )}
          </Button>
        </ButtonDiv>
        <Link className={classes.linkButton}>
          <Typography variant='h4' className={classes.link}>
            Cancel
          </Typography>
        </Link>
      </Card>
    </RootDiv>
  );
};

export default AddRitual;
