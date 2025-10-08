import { postEmployee } from "@/api/employees/postEmployee";
import { Employee, newEmployee } from "@/types/employees/employees.common";
import { useMutation } from "@tanstack/react-query";

export const usePostEmployee = () => {
  const mutation = useMutation<Employee, Error, newEmployee>({
    mutationFn: (data) => postEmployee(data),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return mutation;
};
