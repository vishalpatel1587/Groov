import { IconButton, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CloseIcon from "@material-ui/icons/Close";

import { colors } from "../styling/styles/colors";
import { Button } from "./Button";
import { Loader } from "./Loader";

interface Props {
  title: string;
  onClose: () => void;
  open: boolean;
  modalSize: "sm" | "md" | "lg";
  modalStyle?: "blue" | "red";
  primaryActionTitle: string;
  secondaryActionTitle: string;
  primaryActionClick?: VoidFunction;
  secondaryActionClick?: VoidFunction;
  children: JSX.Element | JSX.Element[];
  primaryActionLoading?: boolean;
}

const useStyles = (style: string, size: string) =>
  makeStyles((theme) => ({
    modal: {
      overflow: "scroll",
    },
    container: {
      backgroundColor: theme.palette.background.paper,
      width: getModalWidth(size),
      position: "relative",
      margin: "auto",
      marginTop: "10%",
      padding: theme.spacing(8, 9),
      borderRadius: theme.spacing(3),
    },
    childrenContainer: {
      marginTop: theme.spacing(6),
    },
    actions: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: theme.spacing(4),
      "& > :not(:first-child)": {
        marginLeft: theme.spacing(3),
      },
    },
    primaryAction: {
      backgroundColor:
        style === "red" ? colors.groovRed[5] : colors.groovBlue[100],
      color: style === "red" ? colors.groovRed[110] : colors.white,
    },
    secondaryAction: {
      color: colors.grey[60],
    },
    closeButton: {
      position: "absolute",
      top: theme.spacing(4),
      right: theme.spacing(4),
      color: colors.grey[60],
    },
  }));

const BasicModal = ({
  title,
  children,
  primaryActionTitle,
  secondaryActionTitle,
  primaryActionClick,
  secondaryActionClick,
  open,
  onClose,
  modalStyle: style = "blue",
  modalSize: size,
  primaryActionLoading,
}: Props) => {
  const classes = useStyles(style, size)();
  return (
    <Modal open={open} onClose={onClose} className={classes.modal}>
      <Box className={classes.container}>
        <Typography variant="h3">{title}</Typography>
        <IconButton
          className={classes.closeButton}
          aria-label="close"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>

        <Box className={classes.childrenContainer}>{children}</Box>
        <Box className={classes.actions}>
          <Button
            onClick={secondaryActionClick}
            className={classes.secondaryAction}
          >
            {secondaryActionTitle}
          </Button>
          <Button
            onClick={primaryActionClick}
            className={classes.primaryAction}
            variant="contained"
          >
            {primaryActionLoading ? <Loader /> : primaryActionTitle}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BasicModal;

function getModalWidth(size: string) {
  switch (size) {
    case "sm":
      return "400px";
    case "md":
      return "500px";
    default:
      return "500px";
  }
}
