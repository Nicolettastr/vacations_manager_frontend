"use client";

import { AuthCard } from "@/components/auth/auth-card";
import CalendarView from "@/components/calendar/calendar-view";
import { EmployeeLegend } from "@/components/employees/employee-legend";
import { Header } from "@/components/layout/header";
import { useAuthStore } from "@/store/useAuthStore";
import { useEmployeeStore } from "@/store/useEmployeeStore";
import { useShallow } from "zustand/shallow";

export default function Home() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [configureEmployees, setConfigureEmployees] = useEmployeeStore(
    useShallow((state) => [
      state.configureEmployees,
      state.setConfigureEmployees,
    ])
  );

  return !isLoggedIn ? (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <AuthCard />
    </div>
  ) : (
    <div className="flex h-screen w-full flex-col bg-background">
      <div className="flex flex-1 overflow-hidden">
        <EmployeeLegend />

        <div className="relative flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <CalendarView />
          </main>

          {configureEmployees && (
            <div
              className="absolute inset-0 z-50 flex items-center justify-center bg-[#000B58]/40 backdrop-blur-sm"
              onClick={() => setConfigureEmployees(false)}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
}
