import CircularProgress from '@material-ui/core/CircularProgress';

interface Props {
  color?: string;
  size?: number;
  thickness?: number;
}

const Loader = (props: Props) => {
  return (
    <CircularProgress
      style={{ color: props.color ? props.color : '#fff' }}
      size={props.size ? props.size : 25}
      thickness={props.thickness ? props.thickness : 5}
    />
  );
};

export default Loader;
