import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/useAuthStore";
import { Calendar as CalendarIcon, Plus, Search } from "lucide-react";

export function Header() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <header className="flex h-16 shrink-0 items-center border-b bg-card px-4 md:px-6 z-10">
      <div className="flex items-center gap-2">
        <CalendarIcon className="h-6 w-6 text-primary" />
        <h1 className="text-lg font-semibold tracking-tight md:text-xl">
          VisorVacaciones
        </h1>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar empleados..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[300px]"
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Ausencia
        </Button>
        <Button
          type="button"
          variant={"destructive"}
          className=""
          onClick={logout}
        >
          Log Out
        </Button>
      </div>
    </header>
  );
}
