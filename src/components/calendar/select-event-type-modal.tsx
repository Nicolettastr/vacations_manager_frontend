import { useModalStore } from "@/store/useModalStore";
import { Dialog } from "@radix-ui/react-dialog";
import { Calendar, FileText, Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("chooseWhatToCreate")}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-3 py-4">
          <Button
            variant="outline"
            className="h-auto p-4 justify-start gap-3"
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
            <Calendar className="w-5 h-5" />
            <div className="text-left flex-1">
              <div className="font-semibold text-sm">
                {t("modal.createLeave")}
              </div>
              <div className="text-xs text-muted-foreground">
                {t("modal.createLeaveDescription")}
              </div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto p-4 justify-start gap-3"
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
            <FileText className="w-5 h-5" />
            <div className="text-left flex-1">
              <div className="font-semibold text-sm">
                {t("modal.createNote")}
              </div>
              <div className="text-xs text-muted-foreground">
                {t("modal.createNoteDescription")}
              </div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto p-4 justify-start gap-3"
            onClick={() => {
              setModalState({
                isOpen: true,
                mode: "create",
                type: "extraDays",
                data: undefined,
              });
              setSelectTypeModal(false);
            }}
          >
            <Plus className="w-5 h-5" />
            <div className="text-left flex-1">
              <div className="font-semibold text-sm">
                {t("createExtraDays")}
              </div>
              <div className="text-xs text-muted-foreground">
                {t("modal.createExtraDaysDescription")}
              </div>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventTypeModal;
