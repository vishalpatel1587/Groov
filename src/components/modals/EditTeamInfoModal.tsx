import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useEffect, useState } from "react";
import BasicModal from "../BasicModal";
import { Input } from "../TextInput";

interface Props {
  open: boolean;
  teamName: string;
  teamDescription: string;
  onClose: () => void;
  saveTeamInfo: (teamName: string, teamDescription: string) => void;
}

const useStyles = makeStyles((theme) => ({
  modalLabel: {
    marginTop: theme.spacing(3),
    textAlign: "left",
  },
}));

const EditTeamInfoModal: React.FC<Props> = ({
  onClose,
  open,
  teamName,
  teamDescription,
  saveTeamInfo,
}) => {
  if (!open) return null;

  const classes = useStyles();
  const [newTeamName, setNewTeamName] = useState(teamName);
  const [newTeamDescription, setNewTeamDescription] = useState(teamDescription);

  useEffect(() => {
    if (!!teamName && !!teamDescription) {
      resetTeamInfo();
    }
  }, [teamName, teamDescription]);

  const resetTeamInfo = (): void => {
    setNewTeamName(teamName);
    setNewTeamDescription(teamDescription);
  };

  const onModalClose = (): void => {
    resetTeamInfo();
    onClose();
  };

  return (
    <BasicModal
      title="Edit team info"
      onClose={onModalClose}
      open={open}
      modalSize="md"
      primaryActionTitle="Continue"
      secondaryActionTitle="Cancel"
      secondaryActionClick={onModalClose}
      primaryActionClick={() => saveTeamInfo(newTeamName, newTeamDescription)}
    >
      <Typography variant="h5" className={classes.modalLabel}>
        Team name
      </Typography>
      <Input
        fullWidth={true}
        name="teamName"
        value={newTeamName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewTeamName(e.target.value)
        }
      />
      <Typography variant="h5" className={classes.modalLabel}>
        Description
      </Typography>
      <Input
        fullWidth={true}
        name="teamName"
        value={newTeamDescription}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewTeamDescription(e.target.value)
        }
      />
    </BasicModal>
  );
};

export default EditTeamInfoModal;
