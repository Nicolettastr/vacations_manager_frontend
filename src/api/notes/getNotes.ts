import { api } from "@/client";
import { NoteResponse } from "@/types/notes/notes.common";

export const getNotes = async (
  token: string | null
): Promise<NoteResponse[] | undefined> => {
  if (!token) {
    return;
  }

  const { data } = await api.get("api/notes", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
