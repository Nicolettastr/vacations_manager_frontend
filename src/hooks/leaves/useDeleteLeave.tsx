import { deleteEmployeeLeave } from "@/api/leaves/deleteEmployeeLeave";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";

export const useDeleteEmployeeLeave = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteEmployeeLeave(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEmployees"] });
      queryClient.invalidateQueries({ queryKey: ["getLeaves"] });

      toast({
        title: "Leave deleted",
        description: "The employee leave has been successfully deleted.",
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Error deleting employee leave:", error);
      toast({
        title: "Employee leave deletion Failed",
        description: "There was an error deleting the employee leave.",
        variant: "destructive",
      });
    },
  });

  return mutation;
};
