import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { TeamMember } from "../../types/Team";
import BasicModal from "../BasicModal";

interface Props {
  open: boolean;
  onClose: () => void;
  teamMember: TeamMember;
  handleRemoveTeamMember: (id: string) => void;
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
  teamMember,
  handleRemoveTeamMember,
}) => {
  const classes = useStyles();

  const onPrimaryActionClick = () => {
    handleRemoveTeamMember(teamMember.id);
    onClose();
  };

  return (
    <BasicModal
      title="Remove team member"
      onClose={onClose}
      open={open}
      modalSize="md"
      modalStyle="red"
      primaryActionTitle="Remove"
      primaryActionClick={onPrimaryActionClick}
      secondaryActionTitle="Cancel"
      secondaryActionClick={onClose}
    >
      <Typography variant="h5" className={classes.modalLabel}>
        {teamMember?.emailAddress}
      </Typography>
    </BasicModal>
  );
};

export default RemoveTeamMemberModal;
