import CircularProgress from '@material-ui/core/CircularProgress';
import { colors } from '../styling/styles/colors';

interface Props {
  color?: string;
  size?: number;
  thickness?: number;
}

export const Loader = (props: Props) => {
  return (
    <CircularProgress
      style={{ color: props.color ? props.color : colors.white }}
      size={props.size ? props.size : 25}
      thickness={props.thickness ? props.thickness : 5}
    />
  );
};


