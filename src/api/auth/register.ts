import { api } from "@/client";
import { Register, userParams } from "@/types/auth/auth.common";

export const registerUser = async (data: userParams): Promise<Register> => {
  const res = await api.post("api/auth/register", data);
  return res.data;
};
