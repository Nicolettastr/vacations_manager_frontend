import { ModalProps } from "../common";

export type NoteTypes = "low" | "medium" | "high";

export interface NoteBase {
  id?: string;
  type: NoteTypes;
  date: string;
  title: string;
  content: string;
  employee_id?: string;
}

export interface NoteCreateRequest extends NoteBase {}

export interface NoteResponse extends NoteBase {
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface NoteModalProps extends ModalProps {
  data?: NoteResponse;
  onSave: (note: NoteCreateRequest) => void;
}
