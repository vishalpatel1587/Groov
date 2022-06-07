import { useState } from "react";
import { useDispatch } from "react-redux";

import InputAdornment from "@material-ui/core/InputAdornment";

import appTheme from "../../styling/theme";
import { validateEmail } from "../../utils/validation";
import BasicModal from "../BasicModal";
import Person from "../svg/Person";
import { Input } from "../TextInput";
import { VerifyAdminAccessApi } from "../../services/api";
import { ToggleUserAdminAccess } from "../../store/actions/actions";

const ENTER_EMAIL_ADDRESS = "Enter your email address to make changes";

interface Props {
  open: boolean;
  onClose: () => void;
  teamId: string;
}

const AdminAccessModal: React.FC<Props> = ({ open, onClose, teamId }) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [emailError, setEmailError] = useState("");
  const dispatch = useDispatch();

  const onPrimaryActionClick = () => {
    const email = emailAddress.trim();
    if (!validateEmail(email)) {
      setEmailError(`Email address is invalid: ${emailAddress.trim()}`);
      return;
    }

    VerifyAdminAccessApi({ teamId, emailAddress }).then((response) => {
      if (response.data.teamMembers.length) {
        dispatch(ToggleUserAdminAccess(true));
        setEmailAddress("");
        onClose();
      } else {
        setEmailError("Sorry, please try again or contact us for support");
      }
    });
  };

  const onCloseClick = () => {
    setEmailAddress("");
    onClose();
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError("");
    setEmailAddress(e.target.value);
  };

  return (
    <BasicModal
      title={ENTER_EMAIL_ADDRESS}
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
        name="emailAddress"
        type="email"
        value={emailAddress}
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
    </BasicModal>
  );
};

export default AdminAccessModal;
