import { getExtraDays } from "@/api/extraDays/getExtraDays";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";

const useGetExtraDays = (isLoggedIn: boolean) => {
  const token = useAuthStore((state) => state.token);
  const { data } = useQuery({
    queryKey: ["getExtraDays", token],
    queryFn: () => getExtraDays(token),
    enabled: isLoggedIn && !!token,
  });

  return {
    extradays: data ?? [],
  };
};

export default useGetExtraDays;
