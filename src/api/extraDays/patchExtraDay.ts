import { api } from "@/client";
import {
  ExtraDayBase,
  ExtraDayWithEmployee,
} from "@/types/extraDays/extraDays.common";

export const editExtraDay = async (
  data: ExtraDayBase & { id: string },
): Promise<ExtraDayWithEmployee> => {
  const res = await api.patch(`api/extraDays/${data.id}`, data);
  return res.data;
};
