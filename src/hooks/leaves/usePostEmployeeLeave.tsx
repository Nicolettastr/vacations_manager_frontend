import { createEmployeeLeave } from "@/api/leaves/postEmployeesLeave";
import { LeaveRequest, LeaveResponse } from "@/types/leaves/leaves.common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";

export const usePostEmployeeLeave = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation<LeaveResponse, Error, LeaveRequest>({
    mutationFn: (data) => createEmployeeLeave(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getLeaves"] });
      if (data.type === "vacation") {
        queryClient.invalidateQueries({ queryKey: ["getEmployees"] });
      }
      toast({
        title: "Leave created",
        description: "The employee leave has been successfully created.",
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Leave creation failed", error);
      toast({
        title: "Leave created failed",
        description: "The employee leave creation has failed.",
        variant: "destructive",
      });
    },
  });

  return mutation;
};
