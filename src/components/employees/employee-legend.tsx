"use client";
import { useDeleteEmployee } from "@/hooks/employees/useDeleteEmployee";
import { useGetEmployees } from "@/hooks/employees/useGetEmployees";
import { usePatchEmployee } from "@/hooks/employees/usePatchEmployee";
import { usePostEmployee } from "@/hooks/employees/usePostEmployee";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/useAuthStore";
import { useEmployeeStore } from "@/store/useEmployeeStore";
import { newEmployee } from "@/types/employees/employees.common";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/shallow";
import { EmployeeModal } from "./employee-modal";
import { Legend } from "./legend";

export function EmployeeLegend() {
  const { t } = useTranslation();
  const { toast } = useToast();

  const [
    configureEmployees,
    setConfigureEmployees,
    modalState,
    setModalState,
    employeesSettingsMobileIcon,
    selectedEmployee,
  ] = useEmployeeStore(
    useShallow((state) => [
      state.configureEmployees,
      state.setConfigureEmployees,
      state.modalState,
      state.setModalState,
      state.employeesSettingsMobileIcon,
      state.selectedEmployee,
    ]),
  );

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { employees, errorEmployee } = useGetEmployees(isLoggedIn);
  const { mutate: onAddEmployee } = usePostEmployee();
  const { mutate: onDeleteEmployee } = useDeleteEmployee();
  const { mutate: onEditEmployee } = usePatchEmployee();

  useEffect(() => {
    if (errorEmployee) {
      toast({
        title: t("errors.errorUpdatingEmployeeTitle"),
        description: t("errors.errorUpdatingEmployeeDesc"),
        variant: "destructive",
      });
    }
  }, [errorEmployee, t]);

  const handleConfigureEmployees = () => {
    setConfigureEmployees(!configureEmployees);
  };

  const handleSaveEmployeeChanges = (employee: newEmployee) => {
    switch (modalState.mode) {
      case "create":
        onAddEmployee(employee);
        break;
      case "edit":
        if (!selectedEmployee) return;
        onEditEmployee({ id: selectedEmployee.id, data: employee });
        break;
      case "delete":
        if (!selectedEmployee) return;
        onDeleteEmployee(selectedEmployee.id);
        break;
      default:
        break;
    }
    setModalState({ isOpen: false, mode: modalState.mode });
  };

  const handleSetModal = () => {
    setModalState({
      isOpen: true,
      mode: "create",
      data: undefined,
    });
  };

  return (
    <>
      {employeesSettingsMobileIcon ? (
        <section
          className={`${
            configureEmployees ? "flex" : "hidden"
          } fixed inset-0 m-auto w-[90%] h-[95%] max-w-sm rounded-xl bg-card p-4 shadow-xl flex-col z-[60]`}
        >
          <Legend
            employees={employees}
            handleSetModal={handleSetModal}
            handleConfigureEmployees={handleConfigureEmployees}
          />
        </section>
      ) : (
        <aside className="hidden min-[965px]:flex w-64 flex-col border-r bg-card p-4 relative z-[60]">
          <Legend
            employees={employees}
            handleSetModal={handleSetModal}
            handleConfigureEmployees={handleConfigureEmployees}
          />
        </aside>
      )}

      {configureEmployees && (
        <div
          className={`fixed top-0 ${
            employeesSettingsMobileIcon ? "left-0" : "left-64"
          } right-0 bottom-0 z-50 bg-[#000B58]/40 backdrop-blur-sm`}
          onClick={handleConfigureEmployees}
        ></div>
      )}

      <EmployeeModal
        isOpen={modalState.isOpen}
        mode={modalState.mode}
        onClose={() => setModalState({ isOpen: false, mode: modalState.mode })}
        onSave={handleSaveEmployeeChanges}
      />
    </>
  );
}
