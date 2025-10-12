"use client";

import type {
  DateSelectArg,
  EventClickArg,
  EventInput,
} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { addDays } from "date-fns";
import { useCallback, useEffect, useState } from "react";

import { useGetEmployees } from "@/hooks/employees/useGetEmployee";
import { useGetEmployeesLeaves } from "@/hooks/leaves/useGetEmployeesLeaves";
import { useGetLeavesTypes } from "@/hooks/leaves/useGetLeavesTypes";
import { useAuthStore } from "@/store/useAuthStore";
import { Employee } from "@/types/employees/employees.common";
import { LeaveRequest, LeaveResponse } from "@/types/leaves/leaves.common";
import { EventModal } from "./event-modal";

type ModalState = {
  isOpen: boolean;
  mode: "create" | "edit" | "view";
  data?: LeaveResponse | { startDate: string; endDate: string };
};

export default function CalendarView() {
  const [events, setEvents] = useState<EventInput[]>([]);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { employees, fetchingEmployee } = useGetEmployees(isLoggedIn);
  const { leavesTypes } = useGetLeavesTypes(isLoggedIn);
  const { leaves, fetchingLeaves } = useGetEmployeesLeaves(isLoggedIn);
  const [LeaveRequest, setLeaveRequest] = useState<LeaveRequest | undefined>(
    undefined
  );
  const [employeesMap, setEmployeesMap] = useState<Map<string, Employee>>(
    new Map()
  );
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    mode: "create",
  });

  useEffect(() => {
    const employeeMap = new Map(employees.map((emp) => [emp.id, emp]));
    setEmployeesMap(employeeMap);
  }, [fetchingEmployee]);

  useEffect(() => {
    const transformedEvents = leaves.map((leave) => {
      const employee = employeesMap.get(leave.employee_id);
      const endDate = addDays(new Date(leave.end_date), 1)
        .toISOString()
        .split("T")[0];
      return {
        id: leave.id,
        title: employee ? `${employee.name} ${employee.surname}` : "Unknown",
        start: leave.start_date,
        end: endDate,
        allDay: true,
        backgroundColor: employee?.color || "#888",
        borderColor: employee?.color || "#888",
        extendedProps: {
          employeeId: leave.employee_id,
          note: leave.note,
          type: leave.type,
        },
      };
    });
    setEvents(transformedEvents);
  }, [fetchingLeaves, employeesMap]);

  const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
    const endDate = addDays(selectInfo.end, -1);
    setModalState({
      isOpen: true,
      mode: "create",
      data: {
        startDate: selectInfo.startStr,
        endDate: endDate.toISOString().split("T")[0],
      },
    });
  }, []);

  const handleEventClick = useCallback(
    (clickInfo: EventClickArg) => {
      const leave = leaves.find((l) => l.id === clickInfo.event.id);
      if (leave) {
        setModalState({
          isOpen: true,
          mode: "view",
          data: leave,
        });
      }
    },
    [leaves]
  );

  const handleCloseModal = () => {
    setModalState({ isOpen: false, mode: "create" });
  };

  const handleSaveLeave = (leave: LeaveRequest) => {
    console.log("handleSaveLeave", leave);
    handleCloseModal();
  };

  const handleDeleteLeave = (leaveId: string) => {
    console.log("handleDeleteLeave", leaveId);
    handleCloseModal();
  };

  return (
    <>
      <div className="h-full rounded-lg border bg-card text-card-foreground shadow-sm p-4">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek",
          }}
          events={events}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          editable={true}
          droppable={true}
          locale="es"
          buttonText={{
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
          }}
          height="100%"
        />
      </div>
      <EventModal
        isOpen={modalState.isOpen}
        mode={modalState.mode}
        data={modalState.data}
        employees={employees}
        leaveTypes={leavesTypes}
        onClose={handleCloseModal}
        onSave={handleSaveLeave}
        onDelete={handleDeleteLeave}
        setMode={(mode) => setModalState((s) => ({ ...s, mode }))}
      />
    </>
  );
}
