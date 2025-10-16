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
        title: "Todo salió bien",
        description: "Operación completada correctamente.",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["getEmployees"] });
    },
  });

  return mutation;
};
