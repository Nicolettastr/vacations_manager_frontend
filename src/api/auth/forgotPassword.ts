import { api } from "@/client";

export const forgotPassword = async (email: string) => {
  const res = await api.post("/api/auth/forgot-password", { email });
  return res.data;
};
