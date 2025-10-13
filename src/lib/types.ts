// DATES
// ISO string "YYYY-MM-DD"

import { Employee } from "@/types/employees/employees.common";
import {
  LeaveRequest,
  LeaveResponse,
  leaveTypes,
} from "@/types/leaves/leaves.common";

export type LeaveType = "Vacation" | "Sick Leave" | "Personal" | "Unpaid";

export type Leave = {
  id: string;
  employeeId: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  note: string;
};

export type Note = {
  id: string;
  date: string;
  content: string;
  type: "low" | "medium" | "high";
  employeeId?: string;
};

export type EventModalProps = {
  isOpen: boolean;
  mode: "create" | "edit" | "view";
  data?: LeaveResponse | { startDate: string; endDate: string };
  employees: Employee[];
  leaveTypes: leaveTypes[];
  onClose: () => void;
  onSave: (leave: LeaveRequest) => void;
  onDelete: (leaveId: string) => void;
};
