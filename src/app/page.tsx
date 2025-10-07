import { AuthCard } from "@/components/auth/auth-card";
import CalendarView from "@/components/calendar/calendar-view";
import { EmployeeLegend } from "@/components/employee-legend";
import { Header } from "@/components/layout/header";

export default function Home() {
  const login = false;

  return !login ? (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <AuthCard />
    </div>
  ) : (
    <div className="flex h-screen w-full flex-col bg-background">
      <div className="flex flex-1 overflow-hidden">
        <EmployeeLegend />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <CalendarView />
          </main>
        </div>
      </div>
    </div>
  );
}
