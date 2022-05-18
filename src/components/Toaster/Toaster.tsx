import { VariantType } from "notistack";
import { Box, Grid } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { ToasterUtils } from "./ToasterUtils";
import { toasterStyles } from "./toasterStyles";
import { toasterPrompts } from "../../prompts/prompts";
import { CloseToasterButton } from "./CloseToasterButton";
import lightningIcon from "../../assets/icons/ic-lightning.svg";

const useStyles = makeStyles((theme: Theme) => toasterStyles);

interface Props {
  message?: any;
  // description: string;
  id?: React.ReactText;
  open?: boolean;
  title?: any;
  description?: any;
  handleClose?: any;
  type?: string;
  variant: VariantType;
}

// eslint-disable-next-line react/display-name
export const Toaster = React.forwardRef((props: Props, ref: any) => {
  const classes = useStyles();
  const { message, variant } = props;

  let title = "";
  switch (variant) {
    case "success":
      title = toasterPrompts.titles.success;
      break;
    case "error":
      title = toasterPrompts.titles.error;
      break;
    default:
      title = "";
  }

  const closeToaster = () => {
    ToasterUtils.close();
  };

  return (
    <div ref={ref}>
      <Grid container className={classes.snackbar}>
        <Box display="flex" flexDirection="row">
          <Grid className={classes.iconGrid}>
            <div className={classes.icon}>
              <img src={lightningIcon} alt="toastImg" />
            </div>
          </Grid>
          <Grid>
            <div className={classes.title}>{props.title || title}</div>
            <div className={classes.description}>{message}</div>
          </Grid>
        </Box>
        <Grid className={classes.close}>
          <CloseToasterButton onClick={closeToaster} />
        </Grid>
      </Grid>
    </div>
  );
});
