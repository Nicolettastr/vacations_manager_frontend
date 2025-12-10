import { api } from "@/client";
import { User } from "@/types/auth/auth.common";

export const getUser = async (
  token: string | null
): Promise<User | undefined> => {
  if (!token) {
    return;
  }

  const { data } = await api.get("api/user", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
