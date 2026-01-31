import { useModalStore } from "@/store/useModalStore";
import { ExtraDayBase } from "@/types/extraDays/extraDays.common";
import { LeaveRequest } from "@/types/leaves/leaves.common";
import { NoteCreateRequest } from "@/types/notes/notes.common";
import { EventClickArg } from "@fullcalendar/core/index.js";
import { addDays } from "date-fns";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { GenerateViewEvents } from "./useGenerateViewEvents";
import { ModalHandlersProps } from "./useModalHandlers";

export type FullCalendarHandlerProps = Omit<GenerateViewEvents, "employees"> &
  ModalHandlersProps;

export const useFullCalendarHandlers = ({
  leaves,
  notes,
  extradays,
  onEditNote,
  onEditEmployeeLeave,
  onEditExtraDay,
}: FullCalendarHandlerProps) => {
  const { t } = useTranslation();
  const setModalState = useModalStore((state) => state.setModalState);

  const handleEventClick = useCallback(
    (clickInfo: EventClickArg) => {
      const eventType = clickInfo.event.extendedProps.type;

      switch (eventType) {
        case "leave":
          const leave = leaves.find((leave) => leave.id === clickInfo.event.id);
          if (leave) {
            setModalState({
              isOpen: true,
              mode: "view",
              type: "leave",
              data: leave,
            });
          }
          break;
        case "note":
          const note = notes.find((note) => note.id === clickInfo.event.id);
          if (note) {
            setModalState({
              isOpen: true,
              mode: "view",
              type: "note",
              data: note,
            });
          }
          break;
        case "extraDays":
          const extraDay = extradays.find(
            (extraDay) => extraDay.id === clickInfo.event.id,
          );
          if (extraDay) {
            setModalState({
              isOpen: true,
              mode: "view",
              type: "extraDays",
              data: extraDay,
            });
          }
          break;
      }
    },
    [leaves, notes, extradays, t],
  );

  const handleEventDrop = useCallback(
    (info: any) => {
      const { event } = info;
      const eventType = event.extendedProps.type;

      const formatDateLocal = (date: Date) => date.toLocaleDateString("en-CA");

      const newStart = event.start ? formatDateLocal(event.start) : "";
      const newEnd = event.end
        ? formatDateLocal(addDays(event.end, -1))
        : newStart;

      if (eventType === "leave") {
        const updatedLeave: LeaveRequest = {
          id: event.id,
          employee_id: event.extendedProps.employeeId,
          type: event.extendedProps.leaveType,
          start_date: newStart!,
          end_date: newEnd!,
          note: event.extendedProps.note,
        };

        try {
          onEditEmployeeLeave(updatedLeave);
        } catch (error) {
          console.error(t("errorUpdatingLeave"), error);
          info.revert();
        }
      } else if (eventType === "note") {
        const updatedNote: NoteCreateRequest = {
          id: event.id,
          employee_id: event.extendedProps.employeeId,
          title: event.title,
          content: event.extendedProps.content,
          date: newStart!,
          type:
            event.backgroundColor === "#ff4d4d"
              ? "high"
              : event.backgroundColor === "#ffd633"
                ? "medium"
                : "low",
        };

        try {
          onEditNote(updatedNote);
        } catch (error) {
          console.error(t("errorUpdatingNote"), error);
          info.revert();
        }
      } else if (eventType === "extraDays") {
        const updatedExtraDay: ExtraDayBase & { id: string } = {
          id: event.id,
          employee_id: event.extendedProps.employeeId,
          days: event.extendedProps.days,
          reason: event.extendedProps.reason,
          date: newStart!,
        };

        try {
          onEditExtraDay(updatedExtraDay);
        } catch (error) {
          console.error(t("errorUpdatingExtraDay"), error);
          info.revert();
        }
      }
    },
    [onEditEmployeeLeave, onEditNote, t],
  );
  return { handleEventClick, handleEventDrop };
};
