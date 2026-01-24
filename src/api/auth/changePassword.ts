import { api } from "@/client";
import { IChangePassword } from "@/types/auth/auth.common";

export const changePassword = async (body: IChangePassword) => {
  const res = await api.post("/api/auth/change-password", body);
  return res.data;
};
