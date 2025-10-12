import { getLeaves } from "@/api/leaves/getEmployeesLeave";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";

export const useGetEmployeesLeaves = (isLoggedIn: boolean) => {
  const token = useAuthStore((state) => state.token);

  const { data, isFetching } = useQuery({
    queryKey: ["getLeaves", token],
    queryFn: () => getLeaves(token),
    enabled: isLoggedIn && !!token,
  });

  return {
    leaves: data ?? [],
    fetchingLeaves: isFetching,
  };
};
