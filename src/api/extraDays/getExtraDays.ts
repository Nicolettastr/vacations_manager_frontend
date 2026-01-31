import { api } from "@/client";
import { ExtraDayWithEmployee } from "@/types/extraDays/extraDays.common";

export const getExtraDays = async (
  token: string | null,
): Promise<ExtraDayWithEmployee[] | undefined> => {
  if (!token) {
    return;
  }

  const { data } = await api.get("api/extradays", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
