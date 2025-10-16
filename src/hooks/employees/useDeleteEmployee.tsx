import { deleteEmployee } from "@/api/employees/deleteEmployee";
import { useEmployeeStore } from "@/store/useEmployeeStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteEmployee = () => {
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
    },
  });

  return mutation;
};
