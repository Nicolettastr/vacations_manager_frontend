import { api } from "@/client";
import { Employee, newEmployee } from "@/types/employees/employees.common";

export const postEmployee = async (data: newEmployee): Promise<Employee> => {
  const res = await api.post("api/employees", data);
  return res.data;
};
