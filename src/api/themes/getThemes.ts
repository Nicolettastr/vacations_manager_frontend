import { api } from "@/client";
import { ITypes } from "@/types/common";

export const getThemes = async (
  token: string | null
): Promise<ITypes[] | undefined> => {
  if (!token) {
    return;
  }

  const { data } = await api.get("api/themes", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
