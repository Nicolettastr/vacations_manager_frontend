import { getEmployees } from "@/api/employees/getEmployees";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";

export const useGetEmployees = (isLoggedIn: boolean) => {
  const token = useAuthStore((state) => state.token);

  const { data, isFetching } = useQuery({
    queryKey: ["getEmployees", token],
    queryFn: () => getEmployees(token),
    enabled: isLoggedIn && !!token,
  });

  return {
    employees: data ?? [],
    fetchingEmployee: isFetching,
  };
};
