"use client";

import { useGetEmployees } from "@/hooks/employees/useGetEmployees";
import { useDeleteEmployeeLeave } from "@/hooks/leaves/useDeleteLeave";
import { useGetEmployeesLeaves } from "@/hooks/leaves/useGetEmployeesLeaves";
import { useGetLeavesTypes } from "@/hooks/leaves/useGetLeavesTypes";
import { usePatchEmployeeLeave } from "@/hooks/leaves/usePatchEmployeeLeave";
import { usePostEmployeeLeave } from "@/hooks/leaves/usePostEmployeeLeave";
import { useDeleteNotes } from "@/hooks/notes/useDeleteNotes";
import { useGetNotes } from "@/hooks/notes/useGetNotes";
import { usePatchNotes } from "@/hooks/notes/usePatchNotes";
import { usePostNote } from "@/hooks/notes/usePostNote";
import { useAuthStore } from "@/store/useAuthStore";
import { useCommonDataStore } from "@/store/useCommonDataStore";
import { useModalStore } from "@/store/useModalStore";
import { LeaveRequest, LeaveResponse } from "@/types/leaves/leaves.common";
import { NoteCreateRequest, NoteResponse } from "@/types/notes/notes.common";
import type {
  DateSelectArg,
  EventClickArg,
  EventInput,
} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { addDays } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/shallow";
import i18n from "../../../infrastructure/i18n";
import { EventModalForm } from "./event-modal";
import { NoteModal } from "./note-modal";
import EventTypeModal from "./select-event-type-modal";

const NOTE_TYPE_COLORS = {
  high: "var(--note-high-color, #ff4d4d)",
  medium: "var(--note-medium-color, #ffd633)",
  low: "var(--note-low-color, #4da6ff)",
} as const;

export default function CalendarView() {
  const { t } = useTranslation();
  const [events, setEvents] = useState<EventInput[]>([]);
  const [selectTypeModal, setSelectTypeModal] = useState<boolean>(false);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [modalState, setModalState, clearModal] = useModalStore(
    useShallow((state) => [
      state.modalState,
      state.setModalState,
      state.resetStore,
    ])
  );
  const setSelectedDate = useCommonDataStore((state) => state.setSelectedDate);

  const { employees } = useGetEmployees(isLoggedIn);
  const { leavesTypes } = useGetLeavesTypes(isLoggedIn);
  const { leaves } = useGetEmployeesLeaves(isLoggedIn);
  const { mutate: onCreateEmployeeLeave } = usePostEmployeeLeave();
  const { mutate: onEditEmployeeLeave } = usePatchEmployeeLeave();
  const { mutate: onDeleteEmployeeLeave } = useDeleteEmployeeLeave();

  const { notes } = useGetNotes(isLoggedIn);
  const { mutate: onCreateNote } = usePostNote();
  const { mutate: onEditNote } = usePatchNotes();
  const { mutate: onDeleteNote } = useDeleteNotes();

  const employeesMap = useMemo(() => {
    return new Map(employees.map((emp) => [emp.id, emp]));
  }, [employees]);

  useEffect(() => {
    clearModal();
  }, []);

  const generateLeaveEvents = useCallback(() => {
    return leaves.map((leave) => {
      const employee = employeesMap.get(leave.employee_id);

      const endDate = addDays(new Date(leave.end_date), 1)
        .toISOString()
        .split("T")[0];

      return {
        id: leave.id,
        title: employee
          ? `${employee.name} ${employee.surname}`
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

  useEffect(() => {
    const leaveEvents = generateLeaveEvents();
    const noteEvents = generateNoteEvents();
    const combined = [...leaveEvents, ...noteEvents];

    setEvents((prev) => {
      const prevStr = JSON.stringify(prev);
      const newStr = JSON.stringify(combined);
      return prevStr === newStr ? prev : combined;
    });
  }, [generateLeaveEvents, generateNoteEvents]);

  const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
    const startDate = selectInfo.startStr;
    setSelectedDate(startDate);
    setSelectTypeModal(true);
  }, []);

  const handleEventClick = useCallback(
    (clickInfo: EventClickArg) => {
      const eventType = clickInfo.event.extendedProps.type;

      if (eventType === "leave") {
        const leave = leaves.find((l) => l.id === clickInfo.event.id);
        if (leave) {
          setModalState({
            isOpen: true,
            mode: "view",
            type: "leave",
            data: leave,
          });
        }
      } else if (eventType === "note") {
        const note = notes.find((n) => n.id === clickInfo.event.id);
        if (note) {
          setModalState({
            isOpen: true,
            mode: "view",
            type: "note",
            data: note,
          });
        }
      }
    },
    [leaves, notes, t]
  );

  const handleDelete = (id: string, type: "note" | "leave") => {
    setModalState({ isOpen: false, mode: "delete" });
    switch (type) {
      case "note":
        onDeleteNote(id);
        break;
      case "leave":
        onDeleteEmployeeLeave(id);
        break;
    }
  };

  const handleSaveNoteChanges = (note: NoteCreateRequest) => {
    switch (modalState.mode) {
      case "create":
        onCreateNote(note);
        break;
      case "edit":
        onEditNote(note);
        break;
    }
    setModalState({ isOpen: false, mode: modalState.mode });
  };

  const handleSaveLeaveChanges = (leaveData: LeaveRequest) => {
    switch (modalState.mode) {
      case "create":
        onCreateEmployeeLeave(leaveData);
        break;
      case "edit":
        onEditEmployeeLeave(leaveData);
        break;
    }
    setModalState({ isOpen: false, mode: modalState.mode });
  };

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
      }
    },
    [onEditEmployeeLeave, onEditNote, t]
  );

  return (
    <>
      <div className="h-full rounded-lg border bg-card text-card-foreground shadow-sm p-4">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
            multiMonthPlugin,
          ]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "timeGridDay,timeGridWeek,dayGridMonth,multiMonthYear",
          }}
          events={events}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          editable={true}
          locale={i18n.language}
          buttonText={{
            today: t("today"),
            month: t("month"),
            week: t("week"),
            day: t("day"),
          }}
          height="100%"
          eventDrop={handleEventDrop}
        />
      </div>
      <EventTypeModal
        selectTypeModal={selectTypeModal}
        setSelectTypeModal={setSelectTypeModal}
      />
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
}
