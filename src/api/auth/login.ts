import { api } from "@/client";
import { Login, userParams } from "@/types/auth/auth.common";

export const loginUser = async (data: userParams): Promise<Login> => {
  const res = await api.post("api/auth/login", data);
  return res.data;
};
