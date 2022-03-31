import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { makeStyles, Typography } from "@material-ui/core";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { createRitual, updateRitual } from "../../store/actions/actions";
import { CHECKIN_FREQUENCY } from "../../types/CheckinFrequency";

import {
  Link,
  Loader,
  Card,
  Button,
  Input,
  ModalComponent,
  ToasterUtils,
  FullSelectMenu,
} from "../../components";
import { colors } from "../../styling/styles/colors";
import { GetRitualByIdApi } from "../../services/api";

interface Props {}

interface ParamTypes {
  id: string;
  companyId: string;
  teamId: string;
}
const RootDiv = styled.div`
  margin: 0 0%;
  width: 750px;
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
    marginTop: theme.spacing(10),
  },
  link: {
    padding: 0,
    margin: 0,
    color: colors.royalBlue,
  },
  description: { marginBottom: theme.spacing(6) },
  linkButton: {
    margin: theme.spacing(1),
  },
  inputRowText: {
    float: "left",
    minWidth: "fit-content",
    marginRight: theme.spacing(3),
  },
  subHeader: {
    marginBottom: theme.spacing(8),
  },
  updateDescription: {
    marginBottom: theme.spacing(16),
  },
}));

const AddRitual = () => {
  const [open, setOpen] = React.useState(false);
  const [actions, setActions] = useState("");
  const [checkinFrequency, setFrequency] = useState(
    CHECKIN_FREQUENCY.EVERY_MONTH.toString()
  );
  const [triggers, setTriggers] = useState("");
  let { id, teamId, companyId } = useParams<ParamTypes>();
  const location = useLocation<any>();
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const ritual = useSelector((state: RootStateOrAny) => state.rituals);
  useEffect(() => {
    if (id) {
      if (location.state) {
        setTriggers(location.state.trigger);
        setActions(location.state.action);
        setFrequency(location.state.checkinFrequency);
        return;
      }

      const getRitual = async () => {
        const ritual = (await GetRitualByIdApi(id)).data;
        setTriggers(ritual.ritual.trigger);
        setActions(ritual.ritual.action);
        setFrequency(ritual.ritual.checkinFrequency);
      };

      getRitual();
    }
  }, []);

  const onClosePage = () => {
    if (location.state) {
      // we came here from in app navigation
      history.goBack();
    } else {
      // we came from outside the app, no state
      const companyName = location.pathname.split("/")[1];
      history.push(`/${companyName}`);
    }
  };

  const handleSubmit = () => {
    const createData = {
      action: actions,
      checkinFrequency: checkinFrequency,
      trigger: triggers,
      teamId: teamId,
    };
    const updateData = {
      action: actions,
      trigger: triggers,
      checkinFrequency: checkinFrequency,
    };

    if (actions !== "" && triggers !== "") {
      id
        ? dispatch(updateRitual(updateData, id, onClosePage))
        : dispatch(createRitual(createData));
    } else {
      ToasterUtils.error(`Action or trigger can't be empty!!`);
    }
  };

  return (
    <RootDiv>
      <Typography variant="h1" component="h1" gutterBottom align="center">
        {id ? `Update ritual` : `Create new ritual`}
      </Typography>

      {id ? (
        <Typography
          variant="body1"
          gutterBottom
          className={classes.updateDescription}
          align="center"
        >
          Update this ritual to make it work better for your team.
        </Typography>
      ) : (
        <>
          <Typography
            variant="body1"
            gutterBottom
            align="center"
            className={classes.description}
          >
            Create a new ritual by entering a trigger and an action. These can
            be viewed by the rest of the organisation, inspiring them to create
            ones of their own. Science also shows that recording and sharing
            commitments will help to make them stick.
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            className={classes.subHeader}
            align="center"
          >
            <Link href={`/${companyId}/ideas`}>
              <Typography variant="h4" className={classes.link}>
                Click here
              </Typography>
            </Link>{" "}
            to spark ideas about triggers and action suitable for your team
          </Typography>
        </>
      )}
      <Card>
        <InputDiv>
          <Typography variant="h3" className={classes.inputRowText}>
            Trigger
          </Typography>
        </InputDiv>
        <Input
          fullWidth={true}
          name="triggers"
          value={triggers}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTriggers(e.target.value)
          }
          style={{ marginTop: 0 }}
          placeholder="Example: At the beginning of every meeting"
        />
        <InputDiv>
          <Typography variant="h3" className={classes.inputRowText}>
            Action
          </Typography>
        </InputDiv>
        <Input
          fullWidth={true}
          name="actions"
          value={actions}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setActions(e.target.value)
          }
          style={{ marginTop: 0 }}
          placeholder="Example: Share one thing you did well, one thing you learned, and one thing you want to improve"
          multiline={true}
          maxRows={3}
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
            title="Yay! You have created new ritual"
            message="The summary of your rituals have been sent to your email or you can download them by clickling the icon in right top corner."
            buttonTitle="OK"
            onClose={() => setOpen(false)}
          />
        )}

        <ButtonDiv>
          <Button
            className={classes.button}
            onClick={handleSubmit}
            variant="contained"
            disabled={actions === "" || triggers === ""}
          >
            {ritual?.loading ? <Loader /> : id ? "Update" : `Commit`}
          </Button>
        </ButtonDiv>
        <ButtonDiv>
          <Button className={classes.linkButton} onClick={onClosePage}>
            <Typography variant="h4" className={classes.link}>
              Cancel
            </Typography>
          </Button>
        </ButtonDiv>
      </Card>
    </RootDiv>
  );
};

export default AddRitual;
