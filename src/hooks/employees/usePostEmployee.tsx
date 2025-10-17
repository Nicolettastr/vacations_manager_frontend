import { postEmployee } from "@/api/employees/postEmployee";
import { Employee, newEmployee } from "@/types/employees/employees.common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";

export const usePostEmployee = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation<Employee, Error, newEmployee>({
    mutationFn: (data) => postEmployee(data),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["getEmployees"] });
      toast({
        title: "Employee Created",
        description: "The employee has been created successfully.",
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Error creating employee:", error);
      toast({
        title: "Employee Creation Failed",
        description: "There was an error creating the employee.",
        variant: "destructive",
      });
    },
  });

  return mutation;
};
