import { User } from "../auth/auth.common";

export interface Employee extends User {
  id: string;
  name: string;
  surname: string;
  email: string;
  color: string;
  vacation_days: number;
  available_vacation_days: number;
  total_extra_days: number;
  total_extra_hours: number;
  total_days_with_extra: number;
}

export type newEmployee = Omit<Employee, "user_id" | "id" | "avatar">;
