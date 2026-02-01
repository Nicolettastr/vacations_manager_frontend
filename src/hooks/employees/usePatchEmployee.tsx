import { patchEmployee } from "@/api/employees/patchEmployee";
import { Employee, newEmployee } from "@/types/employees/employees.common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useToast } from "../use-toast";

export const usePatchEmployee = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const mutation = useMutation<
    Employee,
    Error,
    { id: string; data: newEmployee }
  >({
    mutationFn: ({ id, data }) => patchEmployee(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEmployees"] });
      toast({
        title: t("employeesHooks.editedTitle"),
        description: t("employeesHooks.editedDesc"),
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Error editing employee:", error);
      toast({
        title: t("employeesHooks.editErrorTitle"),
        description: t("employeesHooks.editErrorDesc"),
        variant: "destructive",
      });
    },
  });

  return mutation;
};
