import { createEmployeeLeave } from "@/api/leaves/postEmployeesLeave";
import { LeaveRequest, LeaveResponse } from "@/types/leaves/leaves.common";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePostEmployeeLeave = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<LeaveResponse, Error, LeaveRequest>({
    mutationFn: (data) => createEmployeeLeave(data),
    onSuccess: (data) => {
      console.log("Leave created successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["getLeaves"] });
    },
  });

  return mutation;
};
