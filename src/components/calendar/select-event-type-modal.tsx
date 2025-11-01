import { useModalStore } from "@/store/useModalStore";
import { Dialog } from "@radix-ui/react-dialog";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface EventTypeModalProps {
  selectTypeModal: boolean;
  setSelectTypeModal: Dispatch<SetStateAction<boolean>>;
}

const EventTypeModal: React.FC<EventTypeModalProps> = ({
  selectTypeModal,
  setSelectTypeModal,
}) => {
  const setModalState = useModalStore((state) => state.setModalState);

  return (
    <Dialog
      open={selectTypeModal}
      onOpenChange={() => setSelectTypeModal(false)}
    >
      <DialogContent className="sm:max-w-[300px] flex-col justify-center align-center">
        <DialogHeader>
          <DialogTitle>¿Qué quieres crear?</DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex justify-between">
          <Button
            variant={"destructive"}
            onClick={() => {
              setModalState({
                isOpen: true,
                mode: "create",
                type: "leave",
                data: undefined,
              });
              setSelectTypeModal(false);
            }}
          >
            Ausencia
          </Button>
          <Button
            variant="default"
            onClick={() => {
              setModalState({
                isOpen: true,
                mode: "create",
                type: "note",
                data: undefined,
              });
              setSelectTypeModal(false);
            }}
          >
            Nota
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventTypeModal;
