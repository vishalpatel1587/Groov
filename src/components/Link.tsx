import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export const Link = styled(Button)(({ theme }) => ({
  paddingTop: theme.spacing(0),
  paddingRight: theme.spacing(1),
  paddingBottom: theme.spacing(0),
  paddingLeft: theme.spacing(1),
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  textTransform: 'none',
  '&:hover': {
    border: 'none',
    background: 'none'
  }
}));
