import { User } from "../auth/auth.common";

export interface Employee extends User {
  id: string;
  name: string;
  surname: string;
  color: null;
  user_id: string;
  avatar: string;
}

export type newEmployee = Pick<Employee, "name" | "surname" | "email">;
