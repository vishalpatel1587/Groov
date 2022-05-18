import { IconButton, makeStyles, Menu, MenuItem } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { colors } from "../styling/styles/colors";

import appTheme from "../styling/theme";
import { Ritual } from "../types/Ritual";
import { formatDate } from "../utils/dateUtils";
import { Card } from "./Card";

interface Props {
  ritual: Ritual;
  showContextMenu: boolean;
  anchor?: any;
  onCloseMenu?: (e: any) => void;
  onContextMenuClick?: (e: any, ritual: Ritual) => void;
  onRemoveRitualClick?: (e: any) => void;
  onEditRitualClick?: (e: any) => void;
}

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: colors.grey[5],
    borderRadius: theme.spacing(3),
    padding: theme.spacing(4),
  },
  cardHeader: {
    padding: 0,
  },
}));

const RitualComponent: React.FC<Props> = ({
  ritual,
  showContextMenu,
  onCloseMenu,
  onContextMenuClick,
  anchor,
  onRemoveRitualClick,
  onEditRitualClick,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.container}>
      <CardHeader
        className={classes.cardHeader}
        title={<Typography variant="h5">{ritual.trigger}</Typography>}
        action={
          <>
            {showContextMenu && (
              <IconButton
                aria-label="more"
                onClick={(e) => {
                  if (onContextMenuClick) onContextMenuClick(e, ritual);
                }}
              >
                <MoreVertIcon />
              </IconButton>
            )}

            <Menu
              anchorEl={anchor}
              open={Boolean(anchor)}
              onClose={onCloseMenu}
            >
              <MenuItem onClick={onEditRitualClick}>Edit ritual</MenuItem>
              <MenuItem onClick={onRemoveRitualClick}>Remove ritual</MenuItem>
            </Menu>
          </>
        }
      />

      <Typography variant="body1" style={{ marginTop: appTheme.spacing(3) }}>
        {ritual.action}
      </Typography>
      <Typography
        variant="subtitle1"
        style={{ marginTop: appTheme.spacing(6) }}
      >
        Checkin frequency: {ritual.checkinFrequency}
      </Typography>
      <Typography
        variant="subtitle1"
        style={{ marginTop: appTheme.spacing(2) }}
      >
        Last updated: {formatDate(ritual.lastUpdateTime)}
      </Typography>
    </Card>
  );
};

export default RitualComponent;
