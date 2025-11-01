import { api } from "@/client";

export const deleteEmployeeLeave = async (id: string) => {
  const res = await api.delete(`api/leaves/${id}`);
  return res.data;
};
