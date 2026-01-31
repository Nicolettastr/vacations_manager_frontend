import {
  ModalHandlersProps,
  useModalHandlers,
} from "@/hooks/calendar/useModalHandlers";
import { useGetLeavesTypes } from "@/hooks/leaves/useGetLeavesTypes";
import { useAuthStore } from "@/store/useAuthStore";
import { useModalStore } from "@/store/useModalStore";
import { Employee } from "@/types/employees/employees.common";
import { ExtraDayWithEmployee } from "@/types/extraDays/extraDays.common";
import { LeaveResponse } from "@/types/leaves/leaves.common";
import { NoteResponse } from "@/types/notes/notes.common";
import { useShallow } from "zustand/shallow";
import { EventModalForm } from "./event-modal";
import { ExtraDayModal } from "./extra-day-modal";
import { NoteModal } from "./note-modal";

export type TypeModalsWrapperProps = ModalHandlersProps & {
  employees: Employee[];
};

export const ModalsWrapper = ({
  employees,
  onEditNote,
  onEditEmployeeLeave,
}: TypeModalsWrapperProps) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { leavesTypes } = useGetLeavesTypes(isLoggedIn);
  const [modalState, setModalState] = useModalStore(
    useShallow((state) => [state.modalState, state.setModalState]),
  );
  const { handleDelete, handleSaveLeaveChanges, handleSaveNoteChanges } =
    useModalHandlers({ onEditNote, onEditEmployeeLeave });

  return (
    <>
      {modalState.type === "note" ? (
        <NoteModal
          isOpen={modalState.isOpen}
          data={modalState.data as NoteResponse}
          onClose={() =>
            setModalState({ isOpen: false, mode: modalState.mode })
          }
          onSave={handleSaveNoteChanges}
          onDelete={handleDelete}
          mode={modalState.mode}
          employees={employees}
        />
      ) : modalState.type === "extraDays" ? (
        <ExtraDayModal
          isOpen={modalState.isOpen}
          data={modalState.data as ExtraDayWithEmployee}
          onClose={() =>
            setModalState({ isOpen: false, mode: modalState.mode })
          }
          onDelete={handleDelete}
          mode={modalState.mode}
          employees={employees}
        />
      ) : (
        <EventModalForm
          isOpen={modalState.isOpen}
          mode={modalState.mode}
          data={modalState.data as LeaveResponse}
          employees={employees}
          leaveTypes={leavesTypes}
          onClose={() =>
            setModalState({ isOpen: false, mode: modalState.mode })
          }
          onSave={handleSaveLeaveChanges}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};
