import { Header } from '@/components/layout/header';
import { EmployeeLegend } from '@/components/employee-legend';
import CalendarView from '@/components/calendar/calendar-view';

export default function Home() {
  return (
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
