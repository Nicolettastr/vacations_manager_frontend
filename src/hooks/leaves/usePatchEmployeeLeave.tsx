import { editEmployeeeLeave } from "@/api/leaves/patchEmployeeLeave";
import { LeaveRequest, LeaveResponse } from "@/types/leaves/leaves.common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";

export const usePatchEmployeeLeave = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation<LeaveResponse, Error, LeaveRequest>({
    mutationFn: (data) => editEmployeeeLeave(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getLeaves"] });
      if (data.type === "vacation") {
        queryClient.invalidateQueries({ queryKey: ["getEmployees"] });
      }
      toast({
        title: "Leave edited",
        description: "The employee leave has been successfully edited.",
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Leave edition failed", error);
      toast({
        title: "Leave edition failed",
        description: "The employee leave edition has failed.",
        variant: "destructive",
      });
    },
  });

  return mutation;
};
