import { api } from "@/client";
import { Employee, newEmployee } from "@/types/employees/employees.common";

export const patchEmployee = async (
  id: string,
  data: newEmployee
): Promise<Employee> => {
  const res = await api.patch(`api/employees/${id}`, data);
  return res.data;
};
