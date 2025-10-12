import { api } from "@/client";

export interface LeaveType {
  id: string;
  name: string;
}
export const getLeavesTypes = async (
  token: string | null
): Promise<undefined> => {
  if (!token) {
    return;
  }

  const { data } = await api.get("api/leaves/types", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
