import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import BasicModal from "../BasicModal";

interface Props {
  open: boolean;
  onClose: () => void;
  teamMemberEmailAddress: string;
}

const useStyles = makeStyles((theme) => ({
  modalLabel: {
    marginTop: theme.spacing(3),
    textAlign: "left",
  },
}));

const RemoveTeamMemberModal: React.FC<Props> = ({
  open,
  onClose,
  teamMemberEmailAddress,
}) => {
  const classes = useStyles();

  return (
    <BasicModal
      title="Remove team member"
      onClose={onClose}
      open={open}
      modalSize="md"
      modalStyle="red"
      primaryActionTitle="Remove"
      secondaryActionTitle="Cancel"
      secondaryActionClick={onClose}
    >
      <Typography variant="h5" className={classes.modalLabel}>
        {teamMemberEmailAddress}
      </Typography>
    </BasicModal>
  );
};

export default RemoveTeamMemberModal;
