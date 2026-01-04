import { getEmployeesUsedColors } from "@/api/employees/getEmployeesUsedColors";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";

export const useGetEmployeesUsedColors = (isLoggedIn: boolean) => {
  const token = useAuthStore((state) => state.token);

  const { data, isFetching, error } = useQuery({
    queryKey: ["useGetEmployeesUsedColors", token],
    queryFn: () => getEmployeesUsedColors(token),
    enabled: isLoggedIn && !!token,
  });

  return {
    colors: data ?? [],
    fetchingEmployeesUsedColors: isFetching,
    errorEmployeesUsedColors: error,
  };
};
