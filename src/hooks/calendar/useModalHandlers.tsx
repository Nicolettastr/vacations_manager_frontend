import { useModalStore } from "@/store/useModalStore";
import { UpdateExtraDayBody } from "@/types/extraDays/extraDays.common";
import { LeaveRequest } from "@/types/leaves/leaves.common";
import { NoteCreateRequest } from "@/types/notes/notes.common";
import { useShallow } from "zustand/shallow";
import { useDeleteEmployeeLeave } from "../leaves/useDeleteLeave";
import { usePostEmployeeLeave } from "../leaves/usePostEmployeeLeave";
import { useDeleteNotes } from "../notes/useDeleteNotes";
import { usePostNote } from "../notes/usePostNote";

export interface ModalHandlersProps {
  onEditNote: (updatedNote: NoteCreateRequest) => void;
  onEditEmployeeLeave: (updatedLeave: LeaveRequest) => void;
  onEditExtraDay?: (
    updatedExtraDay: UpdateExtraDayBody & { id: string },
  ) => void;
}

export const useModalHandlers = ({
  onEditNote,
  onEditEmployeeLeave,
}: ModalHandlersProps) => {
  const { mutate: onCreateEmployeeLeave } = usePostEmployeeLeave();
  const { mutate: onDeleteEmployeeLeave } = useDeleteEmployeeLeave();
  const { mutate: onCreateNote } = usePostNote();
  const { mutate: onDeleteNote } = useDeleteNotes();

  const [modalState, setModalState] = useModalStore(
    useShallow((state) => [state.modalState, state.setModalState]),
  );

  const handleDelete = (id: string, type: "note" | "leave") => {
    setModalState({ isOpen: false, mode: "delete" });
    switch (type) {
      case "note":
        onDeleteNote(id);
        break;
      case "leave":
        onDeleteEmployeeLeave(id);
        break;
    }
  };

  const handleSaveNoteChanges = (note: NoteCreateRequest) => {
    switch (modalState.mode) {
      case "create":
        onCreateNote(note);
        break;
      case "edit":
        onEditNote(note);
        break;
    }
    setModalState({ isOpen: false, mode: modalState.mode });
  };

  const handleSaveLeaveChanges = (leaveData: LeaveRequest) => {
    switch (modalState.mode) {
      case "create":
        onCreateEmployeeLeave(leaveData);
        break;
      case "edit":
        onEditEmployeeLeave(leaveData);
        break;
    }
    setModalState({ isOpen: false, mode: modalState.mode });
  };

  return {
    handleDelete,
    handleSaveLeaveChanges,
    handleSaveNoteChanges,
  };
};
