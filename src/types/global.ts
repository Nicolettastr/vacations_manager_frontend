import { newEmployee } from "./employees/employees.common";
import { LeaveResponse } from "./leaves/leaves.common";

export type ModalState = {
  isOpen: boolean;
  mode: "create" | "edit" | "view";
  data?: LeaveResponse | newEmployee;
};
