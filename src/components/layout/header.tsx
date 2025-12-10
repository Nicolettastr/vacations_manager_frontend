import { Button } from "@/components/ui/button";
import { useCommonDataStore } from "@/store/useCommonDataStore";
import { useEmployeeStore } from "@/store/useEmployeeStore";
import { useModalStore } from "@/store/useModalStore";
import { useUserStore } from "@/store/useUserStore";
import {
  Calendar as CalendarIcon,
  Plus,
  Settings,
  UserRound,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/shallow";
import IconTooltip from "../icons/Tooltip";

export function Header() {
  const { t } = useTranslation();
  const setModalState = useModalStore((state) => state.setModalState);
  const [configureEmployees, setConfigureEmployees] = useEmployeeStore(
    useShallow((state) => [
      state.configureEmployees,
      state.setConfigureEmployees,
    ])
  );
  const [userConfiguration, setUserConfiguration] = useUserStore(
    useShallow((state) => [state.userConfiguration, state.setUserConfiguration])
  );

  const employeesSettingsMobileIcon = useEmployeeStore(
    (state) => state.employeesSettingsMobileIcon
  );

  const windowWidth = useCommonDataStore((state) => state.windowWidth);

  const handleConfigureEmployees = () => {
    setConfigureEmployees(!configureEmployees);
  };

  const handleUserConfiguration = () => {
    setUserConfiguration(!userConfiguration);
  };

  return (
    <>
      <header className="flex h-16 shrink-0 items-center border-b bg-card px-4 md:px-6 z-10">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-semibold tracking-tight md:text-xl">
            TeamTracker
          </h1>
        </div>
        <div className="ml-auto flex items-center gap-4">
          {/* <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("searchEmployee")}
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[300px]"
          />
        </div> */}
          {employeesSettingsMobileIcon && (
            <IconTooltip content={t("employeesSettings")}>
              <Settings
                onClick={handleConfigureEmployees}
                className="icon cursor-pointer"
              />
            </IconTooltip>
          )}
          {windowWidth >= 650 && (
            <>
              <Button
                onClick={() =>
                  setModalState({ isOpen: true, mode: "create", type: "note" })
                }
                variant="outline"
              >
                <Plus className="mr-2 h-4 w-4" />
                {t("newNote")}
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  setModalState({ isOpen: true, mode: "create", type: "leave" })
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                {t("newLeave")}
              </Button>
            </>
          )}
          <Button
            type="button"
            variant={"default"}
            onClick={handleUserConfiguration}
          >
            <UserRound />
          </Button>
        </div>
      </header>
    </>
  );
}
