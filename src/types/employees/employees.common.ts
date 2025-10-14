import { User } from "../auth/auth.common";

export interface Employee extends User {
  id: string;
  name: string;
  surname: string;
  color: string | undefined;
  user_id: string;
  avatar: string;
}

export type newEmployee = Omit<Employee, "user_id" | "id" | "avatar">;
