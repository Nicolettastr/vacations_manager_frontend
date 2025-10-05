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

import { employees, leaves as initialLeaves, leaveTypes } from "@/lib/data";
import type { Employee, Leave } from "@/lib/types";
import { EventModal } from "./event-modal";

type ModalState = {
  isOpen: boolean;
  mode: "create" | "edit" | "view";
  data?: Leave | { startDate: string; endDate: string };
};

export default function CalendarView() {
  const [leaves, setLeaves] = useState<Leave[]>(initialLeaves);
  const [events, setEvents] = useState<EventInput[]>([]);
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
  }, []);

  useEffect(() => {
    const transformedEvents = leaves.map((leave) => {
      const employee = employeesMap.get(leave.employeeId);
      const endDate = addDays(new Date(leave.endDate), 1)
        .toISOString()
        .split("T")[0];
      return {
        id: leave.id,
        title: employee ? `${employee.name} ${employee.surname}` : "Unknown",
        start: leave.startDate,
        end: endDate,
        allDay: true,
        backgroundColor: employee?.color || "#888",
        borderColor: employee?.color || "#888",
        extendedProps: {
          employeeId: leave.employeeId,
          note: leave.note,
          type: leave.type,
        },
      };
    });
    setEvents(transformedEvents);
  }, [leaves, employeesMap]);

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

  const handleSaveLeave = (leave: Leave) => {
    if (leaves.some((l) => l.id === leave.id)) {
      // Update
      setLeaves((prev) => prev.map((l) => (l.id === leave.id ? leave : l)));
    } else {
      // Create
      setLeaves((prev) => [...prev, { ...leave, id: `leave-${Date.now()}` }]);
    }
    handleCloseModal();
  };

  const handleDeleteLeave = (leaveId: string) => {
    setLeaves((prev) => prev.filter((l) => l.id !== leaveId));
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
        leaveTypes={leaveTypes}
        onClose={handleCloseModal}
        onSave={handleSaveLeave}
        onDelete={handleDeleteLeave}
        setMode={(mode) => setModalState((s) => ({ ...s, mode }))}
      />
    </>
  );
}
