import { useState } from "react";
import { useDispatch } from "react-redux";

import { Link, makeStyles, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import InputAdornment from "@material-ui/core/InputAdornment";

import { VerifyAdminAccessApi } from "../../services/api";
import { ToggleUserAdminAccess } from "../../store/actions/actions";
import appTheme from "../../styling/theme";
import { validateEmail } from "../../utils/validation";
import BasicModal from "../BasicModal";
import Person from "../svg/Person";
import { Input } from "../TextInput";
import { AdminAccessModalTestId } from "../../test/constants/adminAccessModalTestId";

const ENTER_EMAIL_ADDRESS = "Enter your email address to make changes";

interface Props {
  open: boolean;
  onClose: () => void;
  teamId: string;
}

const useStyles = makeStyles((theme) => ({
  link: {
    "&:hover": {
      color: theme.palette.error.dark,
    },
  },
}));

const AdminAccessModal: React.FC<Props> = ({ open, onClose, teamId }) => {
  const classes = useStyles();
  const [emailAddress, setEmailAddress] = useState("");
  const [showEmailVerificationError, setShowEmailVerificationError] =
    useState(false);
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
        dispatch(ToggleUserAdminAccess(true, emailAddress));
        setEmailAddress("");
        onClose();
      } else {
        setShowEmailVerificationError(true);
      }
    });
  };

  const onCloseClick = () => {
    setEmailAddress("");
    setShowEmailVerificationError(false);
    onClose();
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError("");
    setShowEmailVerificationError(false);
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
        data-testid={AdminAccessModalTestId.EmailAddressTextBox}
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
      <>
        {showEmailVerificationError && (
          <Box style={{ marginLeft: "14px", marginRight: "14px" }}>
            <Typography variant="subtitle2" color="error" display="inline">
              {"Sorry, please try again or "}
            </Typography>
            <Link href="mailto:support@groovnow.com" className={classes.link}>
              <Typography
                variant="subtitle2"
                color="error"
                display="inline"
                style={{ fontWeight: "bold" }}
              >
                {"contact us"}
              </Typography>
            </Link>
            <Typography variant="subtitle2" color="error" display="inline">
              {" for support."}
            </Typography>
          </Box>
        )}
      </>
    </BasicModal>
  );
};

export default AdminAccessModal;
