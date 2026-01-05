import { api } from "@/client";
import { ITypes } from "@/types/common";

export const getLeavesTypes = async (
  token: string | null
): Promise<ITypes[] | undefined> => {
  if (!token) {
    return;
  }

  const { data } = await api.get("api/leaves/types", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
