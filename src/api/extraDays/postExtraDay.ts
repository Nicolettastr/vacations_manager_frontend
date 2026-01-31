import { api } from "@/client";
import {
  ExtraDayBase,
  ExtraDayWithEmployee,
} from "@/types/extraDays/extraDays.common";

export const createExtraDay = async (
  data: ExtraDayBase,
): Promise<ExtraDayWithEmployee> => {
  const res = await api.post("api/extraDays", data);
  return res.data;
};
