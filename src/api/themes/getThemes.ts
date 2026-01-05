import { api } from "@/client";

export interface IThemes {
  id: string;
  theme: string;
}
export const getThemes = async (
  token: string | null
): Promise<IThemes[] | undefined> => {
  if (!token) {
    return;
  }

  const { data } = await api.get("api/themes", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
