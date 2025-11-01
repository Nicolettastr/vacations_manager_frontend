import { Dates } from "./common";
import { newEmployee } from "./employees/employees.common";
import { LeaveResponse } from "./leaves/leaves.common";
import { NoteResponse } from "./notes/notes.common";

export type ModalState = {
  isOpen: boolean;
  mode: "create" | "edit" | "view" | "delete";
  type?: "leave" | "note";
  data?: LeaveResponse | newEmployee | NoteResponse | Dates;
};

export type NewEventTypeModal = {
  isOpen: boolean;
  startDate?: string;
  endDate?: string;
};
