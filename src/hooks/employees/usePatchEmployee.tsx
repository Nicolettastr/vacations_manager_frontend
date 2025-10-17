import { patchEmployee } from "@/api/employees/patchEmployee";
import { Employee, newEmployee } from "@/types/employees/employees.common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";

export const usePatchEmployee = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation<
    Employee,
    Error,
    { id: string; data: newEmployee }
  >({
    mutationFn: ({ id, data }) => patchEmployee(id, data),
    onSuccess: () => {
      toast({
        title: "Employee Edited",
        description: "The employee has been edited successfully.",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["getEmployees"] });
    },
    onError: (error) => {
      console.error("Error editing employee:", error);
      toast({
        title: "Employee editing Failed",
        description: "There was an error editing the employee.",
        variant: "destructive",
      });
    },
  });

  return mutation;
};
