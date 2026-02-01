import { deleteEmployeeLeave } from "@/api/leaves/deleteEmployeeLeave";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useToast } from "../use-toast";

export const useDeleteEmployeeLeave = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteEmployeeLeave(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEmployees"] });
      queryClient.invalidateQueries({ queryKey: ["getLeaves"] });
      toast({
        title: t("leavesHook.deletedTitle"),
        description: t("leavesHook.deletedDesc"),
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Error deleting employee leave:", error);
      toast({
        title: t("leavesHook.deleteErrorTitle"),
        description: t("leavesHook.deleteErrorDesc"),
        variant: "destructive",
      });
    },
  });

  return mutation;
};
