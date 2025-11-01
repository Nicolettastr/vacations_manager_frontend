import { api } from "@/client";
import { NoteCreateRequest, NoteResponse } from "@/types/notes/notes.common";

export const createNote = async (
  data: NoteCreateRequest
): Promise<NoteResponse> => {
  const res = await api.post("api/notes", data);
  return res.data;
};
