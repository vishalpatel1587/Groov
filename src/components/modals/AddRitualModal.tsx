import { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Box, Typography } from "@material-ui/core";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import { makeStyles } from "@material-ui/styles";

import { colors } from "../../styling/styles/colors";
import theme from "../../styling/theme";
import { CHECKIN_FREQUENCY } from "../../types/CheckinFrequency";
import { Ritual } from "../../types/Ritual";
import BasicModal from "../BasicModal";
import { FullSelectMenu } from "../Menu";
import { Input } from "../TextInput";
import { ToasterUtils } from "../Toaster";
import { createRitual, updateRitual } from "../../store/actions/actions";

const GUIDE = {
  edit: `Update this ritual to make it work better for your team`,
  add: `Create a new ritual by entering a trigger and an action. These can be
    viewed by the rest of the organisation, inspiring them to create ones of
    their own. Science also shows that recording and sharing commitments
    will help to make them stick.`,
};

interface Props {
  ritualId?: string;
  teamId: string;
  open: boolean;
  onClose: () => void;
}

const useStyles = makeStyles((_) => ({
  button: {
    marginTop: theme.spacing(10),
  },
  iconButtonContainer: {
    display: "flex",
    color: colors.groovBlue[100],
    marginTop: theme.spacing(6),
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
    minWidth: "fit-content",
  },
  labelSpacing: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
  },
}));

const AddRitualModal: React.FC<Props> = ({
  open,
  onClose,
  ritualId,
  teamId,
}) => {
  if (!open) return null;
  const ritualsRoot = useSelector((state: RootStateOrAny) => state.rituals);
  const ritual = ritualsRoot?.data?.rituals.find(
    (r: Ritual) => r.id === ritualId
  );
  const editMode = !!ritualId;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [trigger, setTrigger] = useState(ritual?.trigger || "");
  const [action, setAction] = useState(ritual?.action || "");
  const [checkinFrequency, setCheckinFrequency] = useState(
    ritual?.checkinFrequency || CHECKIN_FREQUENCY.EVERY_MONTH
  );
  const guideText = editMode ? GUIDE["edit"] : GUIDE["add"];
  const title = editMode ? "Edit ritual" : "Create new ritual";
  const primaryActionTitle = editMode ? "Commit" : "Create";

  const handleRitualSave = (): void => {
    const data = {
      action,
      trigger,
      checkinFrequency,
    };
    if (!data.action || !data.trigger) {
      ToasterUtils.error(`Action or trigger can't be empty!!`);
    }

    if (ritualId) {
      dispatch(updateRitual(data, ritualId, onClose));
    } else {
      const createData = {
        ...data,
        teamId,
      };
      dispatch(createRitual(createData));
    }

    // find a way to reload data
  };

  return (
    <BasicModal
      open={open}
      title={title}
      primaryActionTitle={primaryActionTitle}
      secondaryActionTitle="Cancel"
      onClose={onClose}
      modalSize="sm"
      modalStyle="blue"
      primaryActionClick={handleRitualSave}
      secondaryActionClick={onClose}
      primaryActionLoading={ritualsRoot?.loading}
    >
      <Typography variant="body1" className={classes.inputRowText}>
        {guideText}
      </Typography>
      <Link
        to={{ pathname: "https://www.embed.groovnow.com/public-ritual-ideas" }}
        target="_blank"
        style={{ textDecoration: "none" }}
      >
        <Box className={classes.iconButtonContainer}>
          <EmojiObjectsOutlinedIcon />
          <Typography variant="h5">Ideas for rituals</Typography>
        </Box>
      </Link>
      <Typography
        variant="h5"
        className={`${classes.inputRowText} ${classes.labelSpacing}`}
      >
        Trigger
      </Typography>
      <Input
        fullWidth={true}
        name="triggers"
        value={trigger}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTrigger(e.target.value)
        }
        style={{ marginTop: 0 }}
        placeholder="Example: At the beginning of every meeting"
      />
      <Typography
        variant="h5"
        className={`${classes.inputRowText} ${classes.labelSpacing}`}
      >
        Action
      </Typography>
      <Input
        fullWidth={true}
        name="actions"
        multiline
        rows={3}
        value={action}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setAction(e.target.value)
        }
        style={{ marginTop: 0 }}
        placeholder="Example: Share one thing you did well, one thing you learned, and one thing you want to improve"
      />

      <Typography
        variant="h5"
        className={`${classes.inputRowText} ${classes.labelSpacing}`}
      >
        Check-in frequency
      </Typography>

      <FullSelectMenu
        value={checkinFrequency}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCheckinFrequency(e.target.value)
        }
        items={Object.values(CHECKIN_FREQUENCY).map((frequency) => {
          return { label: frequency, value: frequency };
        })}
      />
    </BasicModal>
  );
};

export default AddRitualModal;
