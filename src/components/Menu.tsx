import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import { colors } from '../styling/styles/colors';

interface Props {
  items: any;
  value: any;
  onChange: any;
}

const Input = withStyles((theme: Theme) =>
  createStyles({
    input: {
      borderRadius: theme.spacing(1),
      position: 'relative',
      color: colors.black,
      fontSize: 16,
      padding: theme.spacing(2),
      marginLeft: theme.spacing(2),
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: theme.spacing(1)
      }
    }
  })
)(InputBase);

export const SelectMenu = (props: Props) => {
  return (
    <Select value={props.value} onChange={props.onChange} input={<Input />}>
      {props.items.map(({ label, value }: any) => (
        <MenuItem value={value} key={value}>
          {label}
        </MenuItem>
      ))}
    </Select>
  );
};

