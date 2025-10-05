import type { Employee, Leave, LeaveType } from './types';

export const employeeColors: Record<string, string> = {
  '1': '#4F46E5', // indigo
  '2': '#06B6D4', // teal
  '3': '#10B981', // green
  '4': '#F59E0B', // amber
  '5': '#EF4444', // red
};

export const employees: Employee[] = [
  { id: '1', name: 'Ana', surname: 'García', email: 'ana@example.com', avatar: '1', color: employeeColors['1'] },
  { id: '2', name: 'Carlos', surname: 'Rodriguez', email: 'carlos@example.com', avatar: '2', color: employeeColors['2'] },
  { id: '3', name: 'Beatriz', surname: 'Lopez', email: 'beatriz@example.com', avatar: '3', color: employeeColors['3'] },
  { id: '4', name: 'David', surname: 'Martinez', email: 'david@example.com', avatar: '4', color: employeeColors['4'] },
  { id: '5', name: 'Elena', surname: 'Perez', email: 'elena@example.com', avatar: '5', color: employeeColors['5'] },
];

export const leaveTypes: LeaveType[] = ['Vacation', 'Sick Leave', 'Personal', 'Unpaid'];

const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();

// Function to format date as YYYY-MM-DD
const formatDate = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}


export const leaves: Leave[] = [
  { id: 'leave-1', employeeId: '1', type: 'Vacation', startDate: formatDate(new Date(currentYear, currentMonth, 2)), endDate: formatDate(new Date(currentYear, currentMonth, 6)), note: 'Family trip' },
  { id: 'leave-2', employeeId: '2', type: 'Sick Leave', startDate: formatDate(new Date(currentYear, currentMonth, 10)), endDate: formatDate(new Date(currentYear, currentMonth, 12)), note: 'Flu' },
  { id: 'leave-3', employeeId: '3', type: 'Personal', startDate: formatDate(new Date(currentYear, currentMonth, 15)), endDate: formatDate(new Date(currentYear, currentMonth, 16)), note: 'Appointment' },
  { id: 'leave-4', employeeId: '1', type: 'Vacation', startDate: formatDate(new Date(currentYear, currentMonth, 20)), endDate: formatDate(new Date(currentYear, currentMonth, 25)), note: '' },
  { id: 'leave-5', employeeId: '4', type: 'Unpaid', startDate: formatDate(new Date(currentYear, currentMonth, 18)), endDate: formatDate(new Date(currentYear, currentMonth, 19)), note: 'Conference' },
  { id: 'leave-6', employeeId: '5', type: 'Vacation', startDate: formatDate(new Date(currentYear, currentMonth, 11)), endDate: formatDate(new Date(currentYear, currentMonth, 15)), note: '' },
];
