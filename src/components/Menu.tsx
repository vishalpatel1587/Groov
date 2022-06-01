import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputBase from "@material-ui/core/InputBase";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  createStyles,
  withStyles,
  Theme,
  makeStyles,
} from "@material-ui/core/styles";
import { colors } from "../styling/styles/colors";
import {AddANewTeamPageTestId} from "../test/constants/addANewTeamPageTestId"

interface Props {
  items: any;
  value: any;
  onChange?: any;
  IconComponent?: any;
}

const Input = withStyles((theme: Theme) =>
  createStyles({
    input: {
      borderTopLeftRadius: theme.spacing(1),
      borderTopRightRadius: theme.spacing(1),
      position: "relative",
      color: colors.black,
      fontSize: 16,
      marginLeft: theme.spacing(2),
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      "&:focus": {
        borderTopLeftRadius: theme.spacing(1),
        borderTopRightRadius: theme.spacing(1),
      },
    },
  })
)(InputBase);

const CustomSelect = withStyles((theme: Theme) =>
  createStyles({
    root: {
      color: colors.black,
      fontWeight: "bold",
      marginRight: theme.spacing(8),
      borderBottom: `3px solid ${colors.royalBlue}`,
      padding: "4px 8px !important",
    },
    icon: {
      color: colors.black,
    },
  })
)(Select);

export const SelectMenu = (props: Props) => {
  return (
    <CustomSelect
      value={props.value}
      onChange={props.onChange}
      input={<Input />}
      IconComponent={ExpandMoreIcon}
    >
      {props.items.map(({ label, value }: any, index: number) => (
        <MenuItem value={value} key={"menu" + index}>
          {label}
        </MenuItem>
      ))}
    </CustomSelect>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  select: {
    borderRadius: theme.spacing(3),
  },
}));

export const FullSelectMenu = (props: Props) => {
  const classes = useStyles();
  return (
    <Select
      data-testid = {AddANewTeamPageTestId.SelectDropDown}
      fullWidth
      value={props.value}
      onChange={props.onChange}
      IconComponent={ExpandMoreIcon}
      variant="outlined"
      className={classes.select}
    >
      {props.items.map(({ label, value }: any, index: number) => (
        <MenuItem value={value} key={"menu" + index}>
          {label}
        </MenuItem>
      ))}
    </Select>
  );
};
