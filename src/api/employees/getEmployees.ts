import { api } from "@/client";
import { Employee } from "@/types/employees/employees.common";

export const getEmployees = async (
  token: string | null
): Promise<Employee | undefined> => {
  if (!token) {
    return;
  }

  const { data } = await api.get("api/employees", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
