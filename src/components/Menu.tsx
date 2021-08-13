import React from 'react';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

interface Props {
  items: any;
  value: any;
  onChange: any;
}

const Input = withStyles((theme: Theme) =>
  createStyles({
    input: {
      borderRadius: 4,
      position: 'relative',
      color: '#000',
      fontSize: 16,
      padding: theme.spacing(2),
      marginLeft: theme.spacing(2),
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 4
      }
    }
  })
)(InputBase);

const SelectMenu = (props: Props) => {
  
  return (
    <Select value={props.value} onChange={props.onChange} input={<Input />}>
      {props.items.map(({ label, value }: any) => (
        <MenuItem value={value} key={value}>{label}</MenuItem>
      ))}
    </Select>
  );
};
export default SelectMenu;
