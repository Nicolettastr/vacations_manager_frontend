import { Employee } from "@/types/employees/employees.common";
import { ExtraDayWithEmployee } from "@/types/extraDays/extraDays.common";
import { LeaveResponse } from "@/types/leaves/leaves.common";
import { NoteResponse } from "@/types/notes/notes.common";
import { addDays } from "date-fns";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

const NOTE_TYPE_COLORS = {
  high: "var(--note-high-color, #ff4d4d)",
  medium: "var(--note-medium-color, #ffd633)",
  low: "var(--note-low-color, #4da6ff)",
} as const;

export interface GenerateViewEvents {
  employees: Employee[];
  leaves: LeaveResponse[];
  notes: NoteResponse[];
  extradays: ExtraDayWithEmployee[];
}

export const useGenerateViewEvents = ({
  employees,
  leaves,
  notes,
  extradays,
}: GenerateViewEvents) => {
  const { t } = useTranslation();
  const employeesMap = useMemo(() => {
    return new Map(employees.map((emp) => [emp.id, emp]));
  }, [employees]);

  const generateLeaveEvents = useCallback(() => {
    return leaves.map((leave) => {
      const employee = employeesMap.get(leave.employee_id);

      const endDate = addDays(new Date(leave.end_date), 1)
        .toISOString()
        .split("T")[0];

      return {
        id: leave.id,
        title: employee
          ? `${employee.name} ${employee.surname} - ${leave.type}`
          : t("unknownEmployee"),
        start: leave.start_date,
        end: endDate,
        allDay: true,
        backgroundColor: employee?.color || "#888",
        borderColor: employee?.color || "#888",
        extendedProps: {
          type: "leave",
          employeeId: leave.employee_id,
          leaveType: leave.type,
          note: leave.note || "",
        },
      };
    });
  }, [leaves, employeesMap, t]);

  const generateNoteEvents = useCallback(() => {
    return notes.map((note) => {
      const color =
        NOTE_TYPE_COLORS[note.type as keyof typeof NOTE_TYPE_COLORS] ||
        NOTE_TYPE_COLORS.low;

      return {
        id: note.id,
        title: note.title || t("untitled"),
        start: note.date,
        end: note.date,
        allDay: true,
        backgroundColor: color,
        borderColor: color,
        extendedProps: {
          type: "note",
          content: note.content,
          employeeId: note.employee_id,
        },
      };
    });
  }, [notes, t]);

  const generateExtraDaysEvents = useCallback(() => {
    return extradays.map((days) => {
      const employee = employeesMap.get(days.employee_id);

      return {
        id: days.id,
        title: `${t("extraDay")}: ${days.employees?.name} ${days.employees?.surname}`,
        start: days.date,
        end: days.date,
        allDay: true,
        backgroundColor: employee?.color || "#888",
        borderColor: employee?.color || "#888",
        extendedProps: {
          type: "extraDays",
          employeeId: days.employee_id,
          reason: days.reason,
        },
      };
    });
  }, [extradays, employeesMap, t]);

  return {
    generateExtraDaysEvents,
    generateLeaveEvents,
    generateNoteEvents,
  };
};
