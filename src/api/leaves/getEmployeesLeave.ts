import { api } from "@/client";
import { LeaveResponse } from "@/types/leaves/leaves.common";

export const getLeaves = async (
  token: string | null
): Promise<LeaveResponse[] | undefined> => {
  if (!token) {
    return;
  }

  const { data } = await api.get("api/leaves", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
