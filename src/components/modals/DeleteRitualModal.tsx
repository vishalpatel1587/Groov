import { Ritual } from "../../types/Ritual";
import BasicModal from "../BasicModal";
import RitualComponent from "../RitualComponent";

interface Props {
  ritual?: Ritual;
  open: boolean;
  onClose: () => void;
  handleDelete: () => void;
}

const DeleteRitualModal: React.FC<Props> = ({
  open,
  onClose,
  handleDelete,
  ritual,
}) => {
  if (!open || !ritual) return null;

  return (
    <BasicModal
      open={open}
      title={"Remove ritual"}
      primaryActionTitle="Remove"
      secondaryActionTitle="Cancel"
      onClose={onClose}
      modalSize="sm"
      modalStyle="red"
      primaryActionClick={handleDelete}
      secondaryActionClick={onClose}
    >
      <RitualComponent ritual={ritual} showContextMenu={false} />
    </BasicModal>
  );
};

export default DeleteRitualModal;
