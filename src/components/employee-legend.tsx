import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetEmployees } from "@/hooks/employees/useGetEmployee";
import { employees } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useAuthStore } from "@/store/useAuthStore";

export function EmployeeLegend() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { employees: employees2 } = useGetEmployees(isLoggedIn);

  console.log("employees2", employees2);

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
          style={{ backgroundColor: employee.color }}
        />
      </div>
    );
  });

  return (
    <aside className="hidden w-64 flex-col border-r bg-card p-4 lg:flex">
      <h2 className="mb-6 text-lg font-semibold tracking-tight">Empleados</h2>
      <div className="flex flex-col gap-4">{employeeMenu}</div>
    </aside>
  );
}
