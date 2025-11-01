import { api } from "@/client";

export const deleteNote = async (id: string) => {
  const res = await api.delete(`api/notes/${id}`);
  return res.data;
};
