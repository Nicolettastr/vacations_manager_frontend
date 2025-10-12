import { getLeavesTypes } from "@/api/leaves/getLeavesTypes";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";

export const useGetLeavesTypes = (isLoggedIn: boolean) => {
  const token = useAuthStore((state) => state.token);

  const { data, isFetching } = useQuery({
    queryKey: ["getLeavesTypes", token],
    queryFn: () => getLeavesTypes(token),
    enabled: isLoggedIn && !!token,
  });

  return {
    leavesTypes: data ?? [],
    fetchingLeavesTypes: isFetching,
  };
};
