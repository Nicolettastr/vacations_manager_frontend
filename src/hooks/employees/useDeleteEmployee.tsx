import { deleteEmployee } from "@/api/employees/deleteEmployee";
import { useEmployeeStore } from "@/store/useEmployeeStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useToast } from "../use-toast";

export const useDeleteEmployee = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const setConfigureEmployees = useEmployeeStore(
    (state) => state.setConfigureEmployees,
  );

  const mutation = useMutation({
    mutationFn: (id: string) => deleteEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEmployees"] });
      queryClient.invalidateQueries({ queryKey: ["getLeaves"] });
      setConfigureEmployees(false);
      toast({
        title: t("employeesHooks.deletedTitle"),
        description: t("employeesHooks.deletedDesc"),
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Error deleting employee:", error);
      toast({
        title: t("employeesHooks.deleteErrorTitle"),
        description: t("employeesHooks.deleteErrorDesc"),
        variant: "destructive",
      });
    },
  });

  return mutation;
};
