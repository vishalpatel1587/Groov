import React from "react";
import { VariantType } from "notistack";
import { Grid } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { Button } from "../Button";
import { ToasterUtils } from "./ToasterUtils";
import { toasterStyles } from "./toasterStyles";
import { colors } from "../../styling/styles/colors";
import { CloseToasterButton } from "./CloseToasterButton";

const useStyles = makeStyles((theme: Theme) => ({
  ...toasterStyles,
  snackbar: {
    ...toasterStyles.snackbar,
    width: 480,
  },
  description: {
    ...toasterStyles.description,
    color: colors.slateGrey,
  },
  confirmButton: {
    background: colors.orange,
    borderRadius: theme.spacing(3),
    width: 132,
    height: 56,
    padding: 18,
    marginRight: 16,
    "&:hover": {
      background: colors.redWarn,
    },
  },
}));

interface Props {
  id: any;
  variant: VariantType | "confirm";
  title?: string;
  message?: string;
  confirmButtonText?: string;
  onConfirm: () => Promise<void>;
}

export const ConfirmActionToaster = React.forwardRef(
  (
    {
      variant,
      onConfirm,
      title = "Are you certain?",
      message = "Please confirm",
      confirmButtonText = "Confirm",
    }: Props,
    ref: any
  ) => {
    const classes = useStyles();

    const closeToaster = () => {
      ToasterUtils.close();
    };

    return (
      <div ref={ref}>
        <Grid container className={classes.snackbar}>
          <Grid item className={classes.iconGrid} justify="center"></Grid>
          <Grid item style={{ width: "45%" }}>
            <div className={classes.title}>{title}</div>
            <div className={classes.description}>{message}</div>
          </Grid>
          <Grid item>
            <Button
              className={classes.confirmButton}
              onClick={() => {
                closeToaster();
                onConfirm();
              }}
            >
              {confirmButtonText}
            </Button>
            <CloseToasterButton onClick={closeToaster} />
          </Grid>
        </Grid>
      </div>
    );
  }
);
