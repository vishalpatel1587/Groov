import { makeStyles } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import appTheme from "../../styling/theme";
import { InvalidEmailError } from "../../types/Errors";
import { validateEmail } from "../../utils/validation";
import BasicModal from "../BasicModal";
import Person from "../svg/Person";
import { Input } from "../TextInput";

const ADD_TEAM_MEMBER = "Add team member";

interface Props {
  open: boolean;
  onClose: () => void;
  handleAddTeamMember: (emailAddresses: string[]) => void;
}

const useStyles = makeStyles((theme) => ({
  modalLabel: {
    marginTop: theme.spacing(3),
    textAlign: "left",
  },
}));

const AddTeamMemberModal: React.FC<Props> = ({
  open,
  onClose,
  handleAddTeamMember,
}) => {
  const classes = useStyles();
  const [newMembers, setNewMembers] = useState("");
  const [emailError, setEmailError] = useState("");
  const getEmailAddresses = (newMembers: string): string[] => {
    const emailAddresses = newMembers
      .split(",")
      .filter((e) => e)
      .map((a) => a.trim());
    emailAddresses.forEach((email) => {
      if (!validateEmail(email))
        throw new InvalidEmailError(`Email is invalid: ${email.trim()}`);
    });

    return emailAddresses;
  };

  const onPrimaryActionClick = () => {
    try {
      const emailAddresses = getEmailAddresses(newMembers);
      handleAddTeamMember(emailAddresses);
      setNewMembers("");
      onClose();
    } catch (error) {
      if (error instanceof InvalidEmailError) setEmailError(error.message);
      else throw error;
    }
  };

  const onCloseClick = () => {
    setNewMembers("");
    onClose();
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError("");
    setNewMembers(e.target.value);
  };

  return (
    <BasicModal
      title={ADD_TEAM_MEMBER}
      onClose={onCloseClick}
      open={open}
      modalSize="md"
      primaryActionTitle="Continue"
      secondaryActionTitle="Cancel"
      secondaryActionClick={onCloseClick}
      primaryActionClick={onPrimaryActionClick}
    >
      <Input
        fullWidth={true}
        name="triggers"
        type="email"
        value={newMembers}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange(e)}
        style={{ marginTop: appTheme.spacing(6) }}
        placeholder="Email address"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          ),
        }}
        error={emailError !== ""}
        helperText={emailError}
      />
      <Typography variant="subtitle1" className={classes.modalLabel}>
        Use comma to seperate multiple email addresses
      </Typography>
    </BasicModal>
  );
};

export default AddTeamMemberModal;
