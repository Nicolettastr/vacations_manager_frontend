import { api } from "@/client";

export const getEmployeesUsedColors = async (
  token: string | null
): Promise<string[] | undefined> => {
  if (!token) {
    return;
  }

  const { data } = await api.get("api/employees/used-colors", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
