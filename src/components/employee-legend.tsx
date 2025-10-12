import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetEmployees } from "@/hooks/employees/useGetEmployee";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useAuthStore } from "@/store/useAuthStore";
import { Pencil, Plus, Settings, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
export function EmployeeLegend() {
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
        <span className="flex flex-row">
          <Trash2 size={18} />
          <Pencil size={18} />
        </span>
      </div>
    );
  });

  const handleConfigureEmployees = () => {
    console.log();
  };

  const handleSaveChanges = () => {
    console.log();
  };

  const handleCancel = () => {
    console.log();
  };

  return (
    <aside className="hidden w-64 flex-col border-r bg-card p-4 lg:flex">
      <div className="w-100 flex-row lg:flex justify-between">
        <h2 className="mb-6 text-lg font-semibold tracking-tight">Empleados</h2>
        <span className="flex flex-row">
          <Plus className="mr-2" />
          <Settings
            onClick={handleConfigureEmployees}
            className="cursor-pointer"
          />
        </span>
      </div>
      <div className="flex flex-col gap-4 h-[80vh]">{employeeMenu}</div>
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
    </aside>
  );
}
