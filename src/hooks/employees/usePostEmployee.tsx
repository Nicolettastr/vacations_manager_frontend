import { postEmployee } from "@/api/employees/postEmployee";
import { Employee, newEmployee } from "@/types/employees/employees.common";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePostEmployee = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Employee, Error, newEmployee>({
    mutationFn: (data) => postEmployee(data),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["getEmployees"] });
    },
  });

  return mutation;
};
