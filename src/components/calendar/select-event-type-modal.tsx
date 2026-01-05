import { useModalStore } from "@/store/useModalStore";
import { Dialog } from "@radix-ui/react-dialog";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const setModalState = useModalStore((state) => state.setModalState);

  return (
    <Dialog
      open={selectTypeModal}
      onOpenChange={() => setSelectTypeModal(false)}
    >
      <DialogContent className="sm:max-w-[350px] flex-col justify-center align-center">
        <DialogHeader>
          <DialogTitle>{t("chooseWhatToCreate")}</DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex justify-between">
          <Button
            variant="destructive"
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
            {t("createLeave")}
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
            {t("modal.createNote")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventTypeModal;
