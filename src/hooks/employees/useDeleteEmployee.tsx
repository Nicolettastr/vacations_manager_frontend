import { deleteEmployee } from "@/api/employees/deleteEmployee";
import { useEmployeeStore } from "@/store/useEmployeeStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";

export const useDeleteEmployee = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const setConfigureEmployees = useEmployeeStore(
    (state) => state.setConfigureEmployees
  );

  const mutation = useMutation({
    mutationFn: (id: string) => deleteEmployee(id),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["getEmployees"] });
      queryClient.invalidateQueries({ queryKey: ["getLeaves"] });
      setConfigureEmployees(false);
      toast({
        title: "Employee deleted",
        description: "The employee has been successfully deleted.",
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Error deleting employee:", error);
      toast({
        title: "Employee deletion Failed",
        description: "There was an error deleting the employee.",
        variant: "destructive",
      });
    },
  });

  return mutation;
};
