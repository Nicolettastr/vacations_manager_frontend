import { api } from "@/client";
import { ITypes } from "@/types/common";

export const getNoteTypes = async (
  token: string | null
): Promise<ITypes[] | undefined> => {
  if (!token) {
    return;
  }

  const { data } = await api.get("api/notes/types", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
