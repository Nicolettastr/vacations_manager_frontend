import { api } from "@/client";
import { User } from "@/types/auth/auth.common";

export const editUser = async (data: User) => {
  const res = await api.patch(`api/users`, data);
  return res.data;
};
