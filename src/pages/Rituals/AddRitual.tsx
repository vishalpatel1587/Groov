import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  useLocation,
  useParams,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import { makeStyles, Typography } from "@material-ui/core";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { createRitual, updateRitual } from "../../store/actions/actions";

import {
  Link,
  Loader,
  Card,
  Button,
  Input,
  ModalComponent,
  ToasterUtils,
} from "../../components";
import { colors } from "../../styling/styles/colors";

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
    color: colors.royalBlue,
    fontFamily: "Averta-Semibold",
    fontWeight: 500,
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

const AddRitual = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const [actions, setActions] = useState("");
  const [triggers, setTriggers] = useState("");
  let { id, teamId, companyId } = useParams<ParamTypes>();
  const location = useLocation<any>();
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
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
      teamId: teamId,
    };
    const updateData = { action: actions, trigger: triggers };

    if (actions !== "" && triggers !== "") {
      id
        ? dispatch(updateRitual(updateData, id))
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
          <Typography
            variant="h3"
            component="h1"
            className={classes.inputRowText}
          >
            Trigger:
          </Typography>
          <Input
            fullWidth={true}
            name="triggers"
            value={triggers}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTriggers(e.target.value)
            }
            style={{ marginTop: 0 }}
            placeholder="Trigger example: At the beginning of every meeting"
          />
        </InputDiv>
        <InputDiv>
          <Typography
            variant="h3"
            component="h1"
            className={classes.inputRowText}
          >
            Action:
          </Typography>
          <Input
            fullWidth={true}
            name="actions"
            value={actions}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setActions(e.target.value)
            }
            style={{ marginTop: 0 }}
            placeholder="Action example: Share one thing you did well, one thing you learned, and one thing you want to improve"
            multiline={true}
            maxRows={3}
          />
        </InputDiv>
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
          <Button className={classes.linkButton} onClick={history.goBack}>
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
