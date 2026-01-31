import { useModalStore } from "@/store/useModalStore";
import {
  ExtraDayBase,
  ExtraDayWithEmployee,
} from "@/types/extraDays/extraDays.common";
import { LeaveRequest } from "@/types/leaves/leaves.common";
import { NoteCreateRequest } from "@/types/notes/notes.common";
import { useShallow } from "zustand/shallow";
import { useDeleteExtraDay } from "../extraDays/useDeleteExtraDay";
import { usePostExtraDay } from "../extraDays/usePostExtraDay";
import { useDeleteEmployeeLeave } from "../leaves/useDeleteLeave";
import { usePostEmployeeLeave } from "../leaves/usePostEmployeeLeave";
import { useDeleteNotes } from "../notes/useDeleteNotes";
import { usePostNote } from "../notes/usePostNote";

export interface ModalHandlersProps {
  onEditNote: (updatedNote: NoteCreateRequest) => void;
  onEditEmployeeLeave: (updatedLeave: LeaveRequest) => void;
  onEditExtraDay: (updatedExtraDay: ExtraDayBase & { id: string }) => void;
}

export const useModalHandlers = ({
  onEditNote,
  onEditEmployeeLeave,
  onEditExtraDay,
}: ModalHandlersProps) => {
  const { mutate: onCreateEmployeeLeave } = usePostEmployeeLeave();
  const { mutate: onDeleteEmployeeLeave } = useDeleteEmployeeLeave();
  const { mutate: onCreateNote } = usePostNote();
  const { mutate: onDeleteNote } = useDeleteNotes();
  const { mutate: onCreateExtraDay } = usePostExtraDay();
  const { mutate: onDeleteExtraDay } = useDeleteExtraDay();

  const [modalState, setModalState] = useModalStore(
    useShallow((state) => [state.modalState, state.setModalState]),
  );

  const handleDelete = (id: string, type: "note" | "leave" | "extraDay") => {
    setModalState({ isOpen: false, mode: "delete" });
    switch (type) {
      case "note":
        onDeleteNote(id);
        break;
      case "leave":
        onDeleteEmployeeLeave(id);
        break;
      case "extraDay":
        onDeleteExtraDay(id);
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

  const handleSaveExtraDaysChanges = (extraDay: ExtraDayBase) => {
    let data;
    if (modalState.mode === "edit" && modalState.type === "extraDays") {
      data = modalState.data as ExtraDayWithEmployee;
    }

    switch (modalState.mode) {
      case "create":
        onCreateExtraDay(extraDay);
        break;
      case "edit":
        onEditExtraDay({
          id: data?.id ?? "",
          ...extraDay,
        });
        break;
    }

    setModalState({ isOpen: false, mode: modalState.mode });
  };

  return {
    handleDelete,
    handleSaveLeaveChanges,
    handleSaveNoteChanges,
    handleSaveExtraDaysChanges,
  };
};
