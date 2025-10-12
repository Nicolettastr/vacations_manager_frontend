import { api } from "@/client";
import { LeaveRequest, LeaveResponse } from "@/types/leaves/leaves.common";

export const createEmployeeLeave = async (
  data: LeaveRequest
): Promise<LeaveResponse> => {
  const res = await api.post("api/leaves", data);
  return res.data;
};
