import { ModalProps } from "../common";

export interface ExtraDayBase {
  employee_id: string;
  days: number;
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

export type UpdateExtraDayBody = Partial<Omit<ExtraDayBase, "employee_id">> & {
  employee_id?: string;
};

export type UpdateExtraDayResponse = ExtraDay;

export interface ExtraDayModalProps extends ModalProps {
  data?: ExtraDayWithEmployee;
}
