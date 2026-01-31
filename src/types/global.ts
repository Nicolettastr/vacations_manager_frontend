import { Dates } from "./common";
import { newEmployee } from "./employees/employees.common";
import { ExtraDay, ExtraDayWithEmployee } from "./extraDays/extraDays.common";
import { LeaveResponse } from "./leaves/leaves.common";
import { NoteResponse } from "./notes/notes.common";

export type ModalState = {
  isOpen: boolean;
  mode: "create" | "edit" | "view" | "delete";
  type?: "leave" | "note" | "extraDays";
  data?:
    | LeaveResponse
    | newEmployee
    | NoteResponse
    | Dates
    | ExtraDay
    | ExtraDayWithEmployee;
};

export type NewEventTypeModal = {
  isOpen: boolean;
  startDate?: string;
  endDate?: string;
};
