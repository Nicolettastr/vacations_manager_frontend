import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/useAuthStore";
import { useModalStore } from "@/store/useModalStore";
import { Calendar as CalendarIcon, Plus, Search } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Header() {
  const { t } = useTranslation();
  const logout = useAuthStore((state) => state.logout);
  const setModalState = useModalStore((state) => state.setModalState);

  return (
    <header className="flex h-16 shrink-0 items-center border-b bg-card px-4 md:px-6 z-10">
      <div className="flex items-center gap-2">
        <CalendarIcon className="h-6 w-6 text-primary" />
        <h1 className="text-lg font-semibold tracking-tight md:text-xl">
          TeamTracker
        </h1>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("searchEmployee")}
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[300px]"
          />
        </div>
        <Button onClick={() => setModalState({ isOpen: true, mode: "create" })}>
          <Plus className="mr-2 h-4 w-4" />
          {t("newLeave")}
        </Button>
        <Button
          type="button"
          variant={"destructive"}
          className=""
          onClick={logout}
        >
          {t("logout")}
        </Button>
      </div>
    </header>
  );
}
