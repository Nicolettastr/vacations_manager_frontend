"use client";

import { AuthCard } from "@/components/auth/auth-card";
import CalendarView from "@/components/calendar/calendar-view";
import { EmployeeLegend } from "@/components/employees/employee-legend";
import { Header } from "@/components/layout/header";
import { useAuthStore } from "@/store/useAuthStore";
import { useEmployeeStore } from "@/store/useEmployeeStore";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/shallow";

export default function Home() {
  const { t } = useTranslation();
  const [isLoggedIn, isLoading, setIsLoading, setToken, setUser] = useAuthStore(
    useShallow((state) => [
      state.isLoggedIn,
      state.isLoading,
      state.setIsLoading,
      state.setToken,
      state.setUser,
    ])
  );
  const [configureEmployees, setConfigureEmployees] = useEmployeeStore(
    useShallow((state) => [
      state.configureEmployees,
      state.setConfigureEmployees,
    ])
  );

  useEffect(() => {
    setIsLoading(true);

    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setIsLoading(false);
  }, [setIsLoading, setToken, setUser]);

  const handleConfigureEmployee = () => setConfigureEmployees(false);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">{t("common.loading")}</p>
      </div>
    );
  }

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
              onClick={handleConfigureEmployee}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
}
