import { api } from "@/client";

export const deleteEmployee = async (id: string) => {
  const res = await api.delete(`api/employees/${id}`);
  return res.data;
};
