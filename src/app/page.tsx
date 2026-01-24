"use client";

import { AuthCard } from "@/components/auth/auth-card";
import { ResetPasswordCard } from "@/components/auth/reset-password";
import CalendarView from "@/components/calendar/calendar-view";
import { EmployeeLegend } from "@/components/employees/employee-legend";
import { Header } from "@/components/layout/header";
import { AdvancedSettings } from "@/components/user/advancedSettings";
import { UserConfiguration } from "@/components/user/userConfiguration";
import { useGetUser } from "@/hooks/users/useGetUser";
import { useAuthStore } from "@/store/useAuthStore";
import { useCommonDataStore } from "@/store/useCommonDataStore";
import { useEmployeeStore } from "@/store/useEmployeeStore";
import { useModalStore } from "@/store/useModalStore";
import { useUserStore } from "@/store/useUserStore";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/shallow";
import i18n from "../../infrastructure/i18n";

export default function Home() {
  const { t } = useTranslation();

  const [windowWidth, setWindowWidth] = useCommonDataStore(
    useShallow((state) => [state.windowWidth, state.setWindowWidth]),
  );
  const [advancedSettings, setAdvancedSettings] = useState<boolean>(false);
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const resetModalConfiguration = useModalStore((state) => state.resetStore);

  const resetStores = () => {
    resetEmployeesConfig();
    resetModalConfiguration();
  };

  const [isLoggedIn, isLoading, setIsLoading, setToken, setUser, logout] =
    useAuthStore(
      useShallow((state) => [
        state.isLoggedIn,
        state.isLoading,
        state.setIsLoading,
        state.setToken,
        state.setUser,
        state.logout,
      ]),
    );

  const [
    configureEmployees,
    setConfigureEmployees,
    setEmployeesSettingsMobileIcon,
    resetEmployeesConfig,
  ] = useEmployeeStore(
    useShallow((state) => [
      state.configureEmployees,
      state.setConfigureEmployees,
      state.setEmployeesSettingsMobileIcon,
      state.resetStore,
    ]),
  );
  const { user, userFetching } = useGetUser(isLoggedIn);

  const [userConfiguration, setUserConfiguration] = useUserStore(
    useShallow((state) => [
      state.userConfiguration,
      state.setUserConfiguration,
    ]),
  );

  useEffect(() => {
    if (user) {
      setUser(user);
    }
    setUserConfiguration(false);
  }, [userFetching]);

  useEffect(() => {
    if (!user?.extra?.lang) return;

    i18n.changeLanguage(user?.extra?.lang);
  }, [user?.extra?.lang]);

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

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth < 965) {
      setEmployeesSettingsMobileIcon(true);
    } else {
      setEmployeesSettingsMobileIcon(false);
    }
  }, [windowWidth]);

  const handleConfigureEmployee = () => {
    setConfigureEmployees(false);
    setUserConfiguration(false);
    setAdvancedSettings(false);
  };

  const handleAdvancedSettings = () => {
    setAdvancedSettings(!advancedSettings);
  };

  const handleChangePassword = () => {
    setChangePassword(!changePassword);
  };

  const handleLogout = () => {
    logout(resetStores);
  };

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
        {advancedSettings ? (
          <AdvancedSettings
            advancedSettings={advancedSettings}
            handleConfigureEmployee={handleConfigureEmployee}
            handleAdvancedSettings={handleAdvancedSettings}
            handleChangePassword={handleChangePassword}
          />
        ) : userConfiguration ? (
          <UserConfiguration handleAdvancedSettings={handleAdvancedSettings} />
        ) : (
          []
        )}

        {changePassword && (
          <div className="relative">
            <ResetPasswordCard
              advancedSettings={advancedSettings}
              handleCancel={handleChangePassword}
              handleLogout={handleLogout}
            />
          </div>
        )}

        <div className="relative flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <CalendarView />
          </main>

          {configureEmployees ||
            (userConfiguration && (
              <div
                className="absolute inset-0 z-50 flex items-center justify-center bg-[#000B58]/40 backdrop-blur-sm"
                onClick={handleConfigureEmployee}
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
}
