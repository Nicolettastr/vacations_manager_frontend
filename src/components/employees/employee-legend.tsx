"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDeleteEmployee } from "@/hooks/employees/useDeleteEmployee";
import { useGetEmployees } from "@/hooks/employees/useGetEmployee";
import { usePatchEmployee } from "@/hooks/employees/usePatchEmployee";
import { usePostEmployee } from "@/hooks/employees/usePostEmployee";
import { useToast } from "@/hooks/use-toast";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useAuthStore } from "@/store/useAuthStore";
import { useEmployeeStore } from "@/store/useEmployeeStore";
import { Employee, newEmployee } from "@/types/employees/employees.common";
import { Pencil, Plus, Settings, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { EmployeeModal } from "./employee-modal";
export function EmployeeLegend() {
  const { toast } = useToast();
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
  const { employees, errorEmployee } = useGetEmployees(isLoggedIn);
  const { mutate: onAddEmployee } = usePostEmployee();
  const { mutate: onDeleteEmployee } = useDeleteEmployee();
  const { mutate: onEditEmployee } = usePatchEmployee();

  const [id, setId] = useState<string>("");

  useEffect(() => {
    if (errorEmployee) {
      toast({
        title: "Employee editing Failed",
        description: "There was an error editing the employee.",
        variant: "destructive",
      });
    }
  }, [errorEmployee]);

  const handleDeleteEmployee = (employee: Employee) => {
    setModalState({ isOpen: true, mode: "delete", data: employee });
    setId(employee.id);
  };

  const handleSelectedEmployee = (employeeId: string) => {
    setId(employeeId);
    const employee = employees.find((emp) => emp.id === employeeId);
    setModalState({ isOpen: true, mode: "edit", data: employee });
    return employees.find((employee) => employee.id === employeeId);
  };

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

  const handleConfigureEmployees = () => {
    setConfigureEmployees(!configureEmployees);
  };

  const handleSaveEmployeeChanges = (employee: newEmployee) => {
    switch (modalState.mode) {
      case "create":
        console.log("Creating employee:", employee);
        onAddEmployee(employee);
        break;
      case "edit":
        console.log("Editing employee:", employee);
        onEditEmployee({ id, data: employee });
        break;
      case "delete":
        console.log("Deleting employee:", employee);
        onDeleteEmployee(id);
        break;
      default:
        break;
    }
    setModalState({ isOpen: false, mode: modalState.mode });
  };

  return (
    <>
      <aside className="hidden w-64 flex-col border-r bg-card p-4 lg:flex">
        <div className="w-100 flex-row lg:flex justify-between">
          <h2 className="mb-6 text-lg font-semibold tracking-tight">
            Empleados
          </h2>
          <span className="flex flex-row">
            <Plus
              onClick={() =>
                setModalState({ isOpen: true, mode: "create", data: undefined })
              }
              className="mr-2 cursor-pointer add_employee_icon icon"
            />
            <Settings
              onClick={handleConfigureEmployees}
              className="icon cursor-pointer"
            />
          </span>
        </div>
        <div className="flex flex-col gap-4 h-[80vh]">{employeeMenu}</div>
        {/* {configureEmployees && (
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
        )} */}
      </aside>
      <EmployeeModal
        isOpen={modalState.isOpen}
        data={modalState.data as newEmployee}
        mode={modalState.mode}
        onClose={() => setModalState({ isOpen: false, mode: modalState.mode })}
        onSave={handleSaveEmployeeChanges}
      />
    </>
  );
}
