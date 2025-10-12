import type { LeaveType } from "./types";

export const employeeColors: Record<string, string> = {
  "1": "#4F46E5", // indigo
  "2": "#06B6D4", // teal
  "3": "#10B981", // green
  "4": "#F59E0B", // amber
  "5": "#EF4444", // red
};

export const leaveTypes: LeaveType[] = [
  "Vacation",
  "Sick Leave",
  "Personal",
  "Unpaid",
];

const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();

// Function to format date as YYYY-MM-DD
const formatDate = (d: Date) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
