import { ModalProps } from "../common";

export interface ExtraDayBase {
  employee_id: string;
  extra_hours: number;
  reason: string;
  date: string;
}

export interface CreateExtraDayBody extends ExtraDayBase {}

export interface ExtraDay extends ExtraDayBase {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface ExtraDayEmployee {
  name: string;
  surname: string;
}

export interface ExtraDayWithEmployee extends ExtraDay {
  employees: ExtraDayEmployee;
}

export interface UpdateExtraDayParams {
  id: string;
}
export interface ExtraDayModalProps extends ModalProps {
  data?: ExtraDayWithEmployee;
  onSave: (extraDay: ExtraDayBase) => void;
}
