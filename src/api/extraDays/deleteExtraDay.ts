import { api } from "@/client";

export const deleteExtraDay = async (id: string) => {
  const res = await api.delete(`api/extraDays/${id}`);
  return res.data;
};
