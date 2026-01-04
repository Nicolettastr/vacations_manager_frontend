import { api } from "@/client";
import { Employee } from "@/types/employees/employees.common";

export const getEmployee = async (
  token: string | null,
  name: string | null
): Promise<Employee[] | undefined> => {
  if (!token || !name) {
    return;
  }

  const { data } = await api.get(`api/employees/search`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { name },
  });
  return data;
};
