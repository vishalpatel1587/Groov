import Modal from "@material-ui/core/Modal";

interface Props {
  title: string;
  onClose: () => void;
  open: boolean;
  size: "sm" | "md" | "lg";
  primaryActionTitle: string;
  secondaryActionTitle: string;
  children: React.ReactElement;
}

const BasicModal = ({ title, children }: Props) => {
  debugger;
  return (
    <Modal title={title} open={true}>
      {children}
    </Modal>
  );
};

export default BasicModal;
