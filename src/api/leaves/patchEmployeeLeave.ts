import { api } from "@/client";
import { LeaveRequest, LeaveResponse } from "@/types/leaves/leaves.common";

export const editEmployeeeLeave = async (
  data: LeaveRequest
): Promise<LeaveResponse> => {
  const res = await api.patch(`api/leaves/${data.id}`, data);
  return res.data;
};
