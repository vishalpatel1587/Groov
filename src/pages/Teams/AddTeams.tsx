import React, { useState } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

import {
  Loader,
  Link,
  Card,
  Button,
  Input,
  ModalComponent,
  ToasterUtils,
  FullSelectMenu,
} from "../../components";
import { createTeam } from "../../store/actions/actions";
import { validateEmail, validateName } from "../../utils/validation";
import theme from "../../styling/theme";
import { CHECKIN_FREQUENCY } from "../../types/CheckinFrequency";
import { AddANewTeamPageTestId } from "../../test/constants/addANewTeamPageTestId";
interface ParamTypes {
  companyId: string;
}
const RootDiv = styled.div`
  margin: 0 0%;
  padding-bottom: 30px;
  max-width: 750px;
`;

const InputDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 25px 0px;
`;

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(10),
  },
  link: {
    padding: 0,
    margin: 0,
    marginBottom: "0.21em",
  },
  linkButton: {
    alignSelf: "center",
    margin: theme.spacing(1),
    marginTop: theme.spacing(10),
  },
  card: { marginTop: "2em" },
  input: {
    marginTop: theme.spacing(0),
  },
  inputRowText: {
    float: "left",
    minWidth: "fit-content",
    marginRight: theme.spacing(3),
  },
  description: { marginBottom: theme.spacing(6) },
  withLink: { display: "flex", justifyContent: "center" },
}));
const AddTeams = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [leaderEmail, setLeaderEmail] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [confirmLeaderEmail, setConfirmLeaderEmail] = useState("");
  const [action, setAction] = useState("");
  const [trigger, setTrigger] = useState("");
  const [checkinFrequency, setFrequency] = useState(
    CHECKIN_FREQUENCY.EVERY_MONTH.toString()
  );
  const history = useHistory();

  const team = useSelector((state: RootStateOrAny) => state.teams);

  const classes = useStyles();
  const dispatch = useDispatch();

  const { companyId } = useParams<ParamTypes>();

  const handleSubmit = () => {
    const team = { name, leaderEmail, companyId, teamDescription };
    const ritual = { action, trigger, checkinFrequency };
    const data = { ...team, ritual };

    if (validateName(name)) {
      if (validateEmail(leaderEmail)) {
        if (leaderEmail === confirmLeaderEmail) {
          if (action !== "" && trigger !== "") {
            dispatch(createTeam(data));
          } else {
            ToasterUtils.error(`Action or trigger can't be empty!!`);
          }
        } else {
          ToasterUtils.error("The email address does not match");
        }
      } else {
        if (leaderEmail === "") {
          ToasterUtils.error("Enter leader email");
        } else {
          ToasterUtils.error("Check email format");
        }
      }
    } else {
      ToasterUtils.error("Enter team name");
    }
  };

  return (
    <RootDiv>
      <Card className={classes.card}>
        <Typography
          variant="h2"
          gutterBottom
          data-testid={AddANewTeamPageTestId.AddANewTeamHeader}
        >
          Add a new team
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          className={classes.description}
        >
          This is where you can record the rituals for your team. These can be
          viewed by the rest of the organisation, inspiring them to create ones
          of their own. Science also shows that recording and sharing
          commitments will help to make them stick.
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          className={classes.description}
        >
          {`When you save the first ritual, you'll receive an email with a unique
          link to this page so that you can view and update these rituals. You
          can share this link with your team.`}
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          className={classes.description}
        >
          <Link href={`/${companyId}/ideas`} className={classes.link}>
            <Typography variant="body1">Click here</Typography>
          </Link>{" "}
          to spark ideas about triggers and actions suitable for your team.
        </Typography>
        <Typography variant="h2" gutterBottom>
          Team information
        </Typography>
        <Input
          data-testid={AddANewTeamPageTestId.TeamNameTextBox}
          fullWidth={true}
          name="name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          placeholder="Team name"
        />
        <Input
          data-testid={AddANewTeamPageTestId.TeamDescriptionTextBox}
          fullWidth={true}
          name="team_description"
          value={teamDescription}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTeamDescription(e.target.value)
          }
          placeholder="Team description (optional)"
        />
        <Input
          data-testid={AddANewTeamPageTestId.EmailTextBox}
          fullWidth={true}
          name="leader_email"
          value={leaderEmail}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLeaderEmail(e.target.value)
          }
          placeholder="Your email"
        />
        <Input
          data-testid={AddANewTeamPageTestId.ConfirmEmailTextBox}
          fullWidth={true}
          name="confirm_leader_email"
          value={confirmLeaderEmail}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmLeaderEmail(e.target.value)
          }
          placeholder="Confirm your email"
        />
        <Box mt={theme.spacing(2)}>
          <Typography variant="h2" gutterBottom>
            Your team ritual
          </Typography>
        </Box>
        <InputDiv>
          <Typography variant="h3" className={classes.inputRowText}>
            Trigger
          </Typography>
        </InputDiv>
        <Input
          data-testid={AddANewTeamPageTestId.ActionTextBox}
          fullWidth={true}
          className={classes.input}
          name="trigger"
          value={trigger}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTrigger(e.target.value)
          }
          placeholder="Example: At the beginning of every meeting"
        />
        <InputDiv>
          <Typography variant="h3" className={classes.inputRowText}>
            Action
          </Typography>
        </InputDiv>
        <Input
          data-testid={AddANewTeamPageTestId.TriggerTextBox}
          fullWidth={true}
          className={classes.input}
          name="action"
          value={action}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAction(e.target.value)
          }
          placeholder="Example: Share one thing you did well, one thing you learned, and one thing you want to improve"
          multiline={true}
          rows={2}
        />
        <InputDiv>
          <Typography
            variant="h3"
            component="h1"
            className={classes.inputRowText}
          >
            Check-in frequency
          </Typography>
        </InputDiv>
        <FullSelectMenu
          data-testid={AddANewTeamPageTestId.SelectDropDown}
          value={checkinFrequency}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFrequency(e.target.value)
          }
          items={Object.values(CHECKIN_FREQUENCY).map((frequency) => {
            return { label: frequency, value: frequency };
          })}
        />
        {open && (
          <ModalComponent
            open={open}
            icon={false}
            title="Great, you've created a new team!"
            message="To add your first ritual, check your email for the special link that we've sent."
            buttonTitle="OK"
            onClose={() => setOpen(false)}
          ></ModalComponent>
        )}
        <Button className={classes.linkButton} onClick={history.goBack}>
          <Typography variant="body1" className={classes.link}>
            <Box data-testid={AddANewTeamPageTestId.CancelButton}> Cancel</Box>
          </Typography>
        </Button>
        <Button
          className={classes.button}
          onClick={handleSubmit}
          variant="contained"
        >
          <Box data-testid={AddANewTeamPageTestId.CommitButton}>
            {team?.createTeam?.loading ? <Loader /> : `Commit`}
          </Box>
        </Button>
      </Card>
    </RootDiv>
  );
};

export default AddTeams;
