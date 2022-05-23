import { RootStateOrAny, useSelector } from "react-redux";
import { Ritual } from "../../types/Ritual";
import BasicModal from "../BasicModal";
import RitualComponent from "../RitualComponent";

interface Props {
  ritualId?: string;
  open: boolean;
  onClose: () => void;
  handleDelete: () => void;
}

const DeleteRitualModal: React.FC<Props> = ({
  open,
  onClose,
  handleDelete,
  ritualId,
}) => {
  if (!open || !ritualId) return null;
  const ritualsRoot = useSelector((state: RootStateOrAny) => state.rituals);
  const ritual = ritualsRoot?.data?.rituals.find(
    (r: Ritual) => r.id === ritualId
  );

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
