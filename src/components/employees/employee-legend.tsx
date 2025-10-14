import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetEmployees } from "@/hooks/employees/useGetEmployee";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useAuthStore } from "@/store/useAuthStore";
import { useEmployeeStore } from "@/store/useEmployeeStore";
import { newEmployee } from "@/types/employees/employees.common";
import { Pencil, Plus, Settings, Trash2 } from "lucide-react";
import { useState } from "react";
import { useShallow } from "zustand/shallow";
import { Button } from "../ui/button";
import { EmployeeModal } from "./employee-modal";
export function EmployeeLegend() {
  const [addEmployee, setAddEmployee] = useState<boolean>(false);
  const [configureEmployees, setConfigureEmployees, modalState, setModalState] =
    useEmployeeStore(
      useShallow((state) => [
        state.configureEmployees,
        state.setConfigureEmployees,
        state.modalState,
        state.setModalState,
      ])
    );

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { employees } = useGetEmployees(isLoggedIn);

  const employeeMenu = employees.map((employee) => {
    const avatar = PlaceHolderImages.find((p) => p.id === employee.avatar);
    return (
      <div key={employee.id} className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          {avatar && (
            <AvatarImage
              src={avatar.imageUrl}
              alt={avatar.description}
              data-ai-hint={avatar.imageHint}
            />
          )}
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
            <Pencil size={17} color="#1570e0ff" className="icon" />
            <Trash2 size={17} color="#DC143C" className="icon" />
          </span>
        )}
      </div>
    );
  });

  const handleConfigureEmployees = () => {
    setConfigureEmployees(!configureEmployees);
  };

  const handleSaveChanges = () => {
    console.log();
  };

  const handleCancel = () => {
    console.log();
  };

  const handleSaveEmployeeChanges = (employee: newEmployee) => {
    console.log(employee);
    setModalState({ isOpen: false, mode: "create" });
  };

  return (
    <>
      <aside className="hidden w-64 flex-col border-r bg-card p-4 lg:flex">
        <div className="w-100 flex-row lg:flex justify-between">
          <h2 className="mb-6 text-lg font-semibold tracking-tight">
            Empleados
          </h2>
          <span className="flex flex-row">
            <Plus className="mr-2 cursor-pointer add_employee_icon icon" />
            <Settings
              onClick={handleConfigureEmployees}
              className="icon cursor-pointer"
            />
          </span>
        </div>
        <div className="flex flex-col gap-4 h-[80vh]">{employeeMenu}</div>
        {configureEmployees && (
          <div className="w-100 flex-row lg:flex justify-end m-1 gap-1">
            <Button
              type="button"
              variant={"default"}
              className=""
              onClick={handleSaveChanges}
            >
              Save
            </Button>
            <Button
              type="button"
              variant={"destructive"}
              className=""
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        )}
      </aside>
      <EmployeeModal
        isOpen={modalState.isOpen}
        data={modalState.data as newEmployee}
        mode={modalState.mode}
        onClose={() => setModalState({ isOpen: false, mode: "create" })}
        onSave={handleSaveEmployeeChanges}
      />
    </>
  );
}
