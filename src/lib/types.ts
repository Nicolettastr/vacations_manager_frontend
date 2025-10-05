// DATES
// ISO string "YYYY-MM-DD"

export type Employee = {
  id: string;
  name: string;
  surname: string;
  email: string;
  avatar: string;
  color: string;
};

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
  data?: Leave | { startDate: string; endDate: string };
  employees: Employee[];
  leaveTypes: LeaveType[];
  onClose: () => void;
  onSave: (leave: Leave) => void;
  onDelete: (leaveId: string) => void;
  setMode: (mode: "create" | "edit" | "view") => void;
};
