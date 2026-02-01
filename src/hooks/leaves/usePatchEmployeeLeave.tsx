import { editEmployeeeLeave } from "@/api/leaves/patchEmployeeLeave";
import { LeaveRequest, LeaveResponse } from "@/types/leaves/leaves.common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useToast } from "../use-toast";

export const usePatchEmployeeLeave = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { toast } = useToast();

  const mutation = useMutation<LeaveResponse, Error, LeaveRequest>({
    mutationFn: (data) => editEmployeeeLeave(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getLeaves"] });
      if (data.type === "vacation") {
        queryClient.invalidateQueries({ queryKey: ["getEmployees"] });
      }
      toast({
        title: t("leavesHook.editedTitle"),
        description: t("leavesHook.editedDesc"),
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Leave edition failed", error);
      toast({
        title: t("leavesHook.editErrorTitle"),
        description: t("leavesHook.editErrorDesc"),
        variant: "destructive",
      });
    },
  });

  return mutation;
};
