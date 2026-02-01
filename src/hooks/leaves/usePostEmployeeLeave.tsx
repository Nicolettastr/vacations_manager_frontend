import { createEmployeeLeave } from "@/api/leaves/postEmployeesLeave";
import { LeaveRequest, LeaveResponse } from "@/types/leaves/leaves.common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useToast } from "../use-toast";

export const usePostEmployeeLeave = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { toast } = useToast();

  const mutation = useMutation<LeaveResponse, Error, LeaveRequest>({
    mutationFn: (data) => createEmployeeLeave(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getLeaves"] });
      if (data.type === "vacation") {
        queryClient.invalidateQueries({ queryKey: ["getEmployees"] });
      }
      toast({
        title: t("leavesHook.createdTitle"),
        description: t("leavesHook.createdDesc"),
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Leave creation failed", error);
      toast({
        title: t("leavesHook.createErrorTitle"),
        description: t("leavesHook.createErrorDesc"),
        variant: "destructive",
      });
    },
  });

  return mutation;
};
