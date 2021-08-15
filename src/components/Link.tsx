import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import { colors } from '../styling/styles/colors';

export const Link = styled(Button)(({ theme }) => ({
  padding: theme.spacing(0, 1),
  margin: theme.spacing(0, 1),
  color: colors.royalBlue,
  textTransform: 'none',
  '&:hover': {
    border: 'none',
    background: 'none'
  }
}));
