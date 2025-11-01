import { api } from "@/client";
import { Note } from "@/types/notes/notes.common";

export const getNotes = async (
  token: string | null
): Promise<Note[] | undefined> => {
  if (!token) {
    return;
  }

  const { data } = await api.get("api/notes", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
