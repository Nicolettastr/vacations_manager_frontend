export interface LeaveResponse {
  id: string;
  employee_id: string;
  type: string;
  start_date: string;
  end_date: string;
  note: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}
export type LeaveRequest = Omit<
  LeaveResponse,
  "created_at" | "updated_at" | "user_id"
>;
