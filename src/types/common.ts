import { Employee } from "./employees/employees.common";
import { LeaveRequest, LeaveResponse } from "./leaves/leaves.common";

export interface ITypes {
  id: string;
  name: string;
}

export type Dates = { startDate: string; endDate: string };

export type ModalProps = {
  isOpen: boolean;
  mode: "create" | "edit" | "view" | "delete";
  onClose: () => void;
  employees: Employee[] | undefined;
  onDelete: (id: string, type: "note" | "leave") => void;
};

export type EventModalProps = ModalProps & {
  leaveTypes: ITypes[];
  data?: LeaveResponse;
  onSave: (leave: LeaveRequest) => void;
};
