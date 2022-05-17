import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import BasicModal from "../BasicModal";
import { Input } from "../TextInput";

interface Props {
  open: boolean;
  teamName: string;
  teamDescription: string;
  onClose: () => void;
  onTeamNameChanged: (teamName: string) => void;
  onTeamDescriptionChanged: (teamDescription: string) => void;
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
  onTeamNameChanged,
  teamDescription,
  onTeamDescriptionChanged,
}) => {
  const classes = useStyles();

  return (
    <BasicModal
      title="Edit team info"
      onClose={onClose}
      open={open}
      modalSize="md"
      primaryActionTitle="Continue"
      secondaryActionTitle="Cancel"
      secondaryActionClick={onClose}
    >
      <>
        <Typography variant="h5" className={classes.modalLabel}>
          Team name
        </Typography>
        <Input
          fullWidth={true}
          name="teamName"
          value={teamName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onTeamNameChanged(e.target.value)
          }
        />
        <Typography variant="h5" className={classes.modalLabel}>
          Description
        </Typography>
        <Input
          fullWidth={true}
          name="teamName"
          value={teamDescription}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onTeamDescriptionChanged(e.target.value)
          }
        />
      </>
    </BasicModal>
  );
};

export default EditTeamInfoModal;
