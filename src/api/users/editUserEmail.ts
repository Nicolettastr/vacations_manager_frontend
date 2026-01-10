import { api } from "@/client";

export const editUserEmail = async (email: string) => {
  const res = await api.patch(`/api/users/email`, { email });
  return res.data;
};
