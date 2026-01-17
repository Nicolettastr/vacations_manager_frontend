import { getThemes } from "@/api/themes/getThemes";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";

export const useGetThemes = (isLoggedIn: boolean) => {
  const token = useAuthStore((state) => state.token);

  const { data, isFetching } = useQuery({
    queryKey: ["getThemes", token],
    queryFn: () => getThemes(token),
    enabled: isLoggedIn && !!token,
    staleTime: Infinity,
  });

  return {
    themes: data ?? [],
    fetchingThemes: isFetching,
  };
};
