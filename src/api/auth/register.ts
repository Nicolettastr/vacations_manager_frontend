import { api } from "@/client";
import { RegisterResponse, userParams } from "@/types/auth/auth.common";

export const registerUser = async (
  data: userParams,
): Promise<RegisterResponse> => {
  try {
    const res = await api.post("api/auth/register", data);

    if (res.data?.error) {
      throw res.data;
    }

    return res.data;
  } catch (err: any) {
    if (err.response?.data) {
      throw err.response.data;
    }

    throw { error: err.message || "Error de conexión" };
  }
};
