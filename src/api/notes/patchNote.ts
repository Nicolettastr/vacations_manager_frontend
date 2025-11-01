import { api } from "@/client";
import { NoteCreateRequest, NoteResponse } from "@/types/notes/notes.common";

export const editNote = async (
  data: NoteCreateRequest
): Promise<NoteResponse> => {
  const res = await api.patch(`api/notes/${data.id}`, data);
  return res.data;
};
