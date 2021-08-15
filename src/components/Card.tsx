import MaterialCard from '@material-ui/core/Card';
import { styled } from '@material-ui/core/styles';
import {colors} from '../styling/styles/colors';

export const Card = styled(MaterialCard)(({theme}) => ({
  padding: theme.spacing(6, 8),
  borderRadius: theme.spacing(6),
  background: colors.white,
  fontWeight: 'bold',
  border: '1px solid rgb(237, 240, 245)',
  boxShadow: 'none',
  '&:hover': {},
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));
