"use client";

import { useFullCalendarHandlers } from "@/hooks/calendar/useFullCalendarHandlers";
import { useGenerateViewEvents } from "@/hooks/calendar/useGenerateViewEvents";
import { useGetEmployees } from "@/hooks/employees/useGetEmployees";
import useGetExtraDays from "@/hooks/extraDays/useGetExtraDays";
import { useGetEmployeesLeaves } from "@/hooks/leaves/useGetEmployeesLeaves";
import { usePatchEmployeeLeave } from "@/hooks/leaves/usePatchEmployeeLeave";
import { useGetNotes } from "@/hooks/notes/useGetNotes";
import { usePatchNotes } from "@/hooks/notes/usePatchNotes";
import { useAuthStore } from "@/store/useAuthStore";
import { useCommonDataStore } from "@/store/useCommonDataStore";
import { useModalStore } from "@/store/useModalStore";
import type { DateSelectArg, EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../../infrastructure/i18n";
import { ModalsWrapper } from "./modalsWrapper";
import EventTypeModal from "./select-event-type-modal";

export default function CalendarView() {
  const { t } = useTranslation();
  const [events, setEvents] = useState<EventInput[]>([]);
  const [selectTypeModal, setSelectTypeModal] = useState<boolean>(false);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const clearModal = useModalStore((state) => state.resetStore);
  const setSelectedDate = useCommonDataStore((state) => state.setSelectedDate);

  const { employees } = useGetEmployees(isLoggedIn);
  const { leaves } = useGetEmployeesLeaves(isLoggedIn);
  const { extradays } = useGetExtraDays(isLoggedIn);
  const { mutate: onEditEmployeeLeave } = usePatchEmployeeLeave();

  const { notes } = useGetNotes(isLoggedIn);
  const { mutate: onEditNote } = usePatchNotes();

  const { generateExtraDaysEvents, generateLeaveEvents, generateNoteEvents } =
    useGenerateViewEvents({ employees, leaves, notes, extradays });
  const { handleEventClick, handleEventDrop } = useFullCalendarHandlers({
    leaves,
    notes,
    extradays,
    onEditNote,
    onEditEmployeeLeave,
  });

  useEffect(() => {
    clearModal();
  }, []);

  useEffect(() => {
    const leaveEvents = generateLeaveEvents();
    const noteEvents = generateNoteEvents();
    const extraDaysEvents = generateExtraDaysEvents();

    const combined = [...leaveEvents, ...noteEvents, ...extraDaysEvents];

    setEvents((prev) => {
      const prevStr = JSON.stringify(prev);
      const newStr = JSON.stringify(combined);
      return prevStr === newStr ? prev : combined;
    });
  }, [generateLeaveEvents, generateNoteEvents, generateExtraDaysEvents]);

  const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
    const startDate = selectInfo.startStr;
    setSelectedDate(startDate);
    setSelectTypeModal(true);
  }, []);

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
      <ModalsWrapper
        employees={employees}
        onEditNote={onEditNote}
        onEditEmployeeLeave={onEditEmployeeLeave}
      />
    </>
  );
}
