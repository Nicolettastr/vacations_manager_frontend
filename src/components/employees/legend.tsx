import { useEmployeeStore } from "@/store/useEmployeeStore";
import { Employee } from "@/types/employees/employees.common";
import { Pencil, Plus, Search, Settings, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/shallow";
import IconTooltip from "../icons/Tooltip";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";

interface ILegendProps {
  handleSetModal: () => void;
  handleConfigureEmployees: () => void;
  employees: Employee[];
  handleId: (id: string) => void;
}

export const Legend: React.FC<ILegendProps> = ({
  handleSetModal,
  handleConfigureEmployees,
  employees,
  handleId,
}) => {
  const { t } = useTranslation();
  const [text, setText] = useState<string>("");

  const handleDeleteEmployee = (employee: Employee) => {
    setModalState({ isOpen: true, mode: "delete", data: employee });
    handleId(employee.id);
  };
  const [configureEmployees, setModalState, employeesSettingsMobileIcon] =
    useEmployeeStore(
      useShallow((state) => [
        state.configureEmployees,
        state.setModalState,
        state.employeesSettingsMobileIcon,
      ])
    );

  const handleSelectedEmployee = (employeeId: string) => {
    handleId(employeeId);
    const employee = employees.find((emp) => emp.id === employeeId);
    setModalState({ isOpen: true, mode: "edit", data: employee });
    return employees.find((employee) => employee.id === employeeId);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // const employeeSearched = employees.filter((employee) =>
    //   employee.name.includes(text)
    // );
    console.log("employeeSearched", e.target.value);
    // //
    //
    setText(e.target.value);
  };

  const employeeMenu = employees.map((employee) => {
    return (
      <div key={employee.id} className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback>
            {employee.name[0]}
            {employee.surname[0]}
          </AvatarFallback>
        </Avatar>
        <span className="font-medium text-sm">
          {employee.name} {employee.surname}
        </span>
        <div
          className="ml-auto h-3 w-3 shrink-0 rounded-full"
          style={{ backgroundColor: employee.color ?? "#000000" }}
        />
        {configureEmployees && (
          <span className="flex flex-row gap-1 cursor-pointer">
            <Pencil
              onClick={() => handleSelectedEmployee(employee.id)}
              size={17}
              color="#1570e0ff"
              className="icon"
            />
            <Trash2
              onClick={() => handleDeleteEmployee(employee)}
              size={17}
              color="#DC143C"
              className="icon"
            />
          </span>
        )}
      </div>
    );
  });

  return (
    <>
      <div className="w-full flex flex-row justify-between items-center">
        <h2 className="mb-6 text-lg font-semibold tracking-tight">
          {t("employees")}
        </h2>
        <span className="flex flex-row mb-6">
          <IconTooltip content={t("addNewEmployee")}>
            <Plus
              onClick={handleSetModal}
              className="mr-2 cursor-pointer add_employee_icon icon"
            />
          </IconTooltip>
          <IconTooltip
            content={t(
              employeesSettingsMobileIcon
                ? "closeSettings"
                : "employeesSettings"
            )}
          >
            {employeesSettingsMobileIcon ? (
              <X
                onClick={handleConfigureEmployees}
                className="icon cursor-pointer"
              />
            ) : (
              <Settings
                onClick={handleConfigureEmployees}
                className="icon cursor-pointer"
              />
            )}
          </IconTooltip>
        </span>
      </div>
      <div className="mb-2 relative w-full flex">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={t("searchEmployee")}
          className="w-full rounded-lg bg-background pl-8"
          value={text}
          onChange={handleSearch}
        />
      </div>
      <div className="flex flex-col gap-4 h-[80vh] overflow-y-auto mt-2">
        {employeeMenu}
      </div>
    </>
  );
};
