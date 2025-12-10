import { getUser } from "@/api/users/getUser";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = (isLoggedIn: boolean) => {
  const token = useAuthStore((state) => state.token);

  const { data, isFetching } = useQuery({
    queryKey: ["getUser", token],
    queryFn: () => getUser(token),
    enabled: isLoggedIn && !!token,
  });

  return {
    user: data,
    userFetching: isFetching,
  };
};
