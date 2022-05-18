import { makeStyles } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import appTheme from "../../styling/theme";
import BasicModal from "../BasicModal";
import Person from "../svg/Person";
import { Input } from "../TextInput";

const ADD_TEAM_MEMBER = "Add team member";

interface Props {
  open: boolean;
  onClose: () => void;
}

const useStyles = makeStyles((theme) => ({
  modalLabel: {
    marginTop: theme.spacing(3),
    textAlign: "left",
  },
}));

const AddTeamMemberModal: React.FC<Props> = ({ open, onClose }) => {
  const classes = useStyles();
  return (
    <BasicModal
      title={ADD_TEAM_MEMBER}
      onClose={onClose}
      open={open}
      modalSize="md"
      primaryActionTitle="Continue"
      secondaryActionTitle="Cancel"
      secondaryActionClick={onClose}
    >
      <Input
        fullWidth={true}
        name="triggers"
        type="email"
        value={""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => console.log(e)}
        style={{ marginTop: appTheme.spacing(6) }}
        placeholder="Email address"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          ),
        }}
      />
      <Typography variant="subtitle1" className={classes.modalLabel}>
        Use comma to seperate multiple email addresses
      </Typography>
    </BasicModal>
  );
};

export default AddTeamMemberModal;
