import { Ritual } from "../../types/Ritual";
import BasicModal from "../BasicModal";
import RitualComponent from "../RitualComponent";

interface Props {
  ritual: Ritual;
  companyId: string;
  open: boolean;
  onClose: () => void;
  handleDelete: () => void;
}

const DeleteRitualModal: React.FC<Props> = ({
  open,
  onClose,
  handleDelete,
  ritual,
  companyId,
}) => {
  if (!open) return null;

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
      <RitualComponent
        ritual={ritual}
        showContextMenu={false}
        companyId={companyId}
      />
    </BasicModal>
  );
};

export default DeleteRitualModal;
