export interface LeaveResponse {
  id: string;
  employee_id: string;
  type: string;
  start_date: Date;
  end_date: Date;
  note: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
}

export interface LeaveRequest {
  employee_id: string;
  type: string;
  start_date: String;
  end_date: String;
  note: string;
}

export interface leaveTypes {
  id: string;
  name: string;
}
