import { api } from "@/client";
import { RegisterResponse, userParams } from "@/types/auth/auth.common";

export const registerUser = async (
  data: userParams
): Promise<RegisterResponse> => {
  try {
    const res = await api.post("api/auth/register", data);

    if (res.data?.error) {
      throw new Error(res.data.error);
    }

    return res.data;
  } catch (err: any) {
    throw new Error(err.response);
  }
};
