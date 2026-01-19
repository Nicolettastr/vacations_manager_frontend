import { api } from "@/client";
import { IResetPassword } from "@/types/auth/auth.common";

export const resetPassword = async (body: IResetPassword) => {
  const res = await api.post("/api/auth/reset-password", body);
  return res.data;
};
