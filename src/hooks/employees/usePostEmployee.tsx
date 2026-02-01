import { postEmployee } from "@/api/employees/postEmployee";
import { Employee, newEmployee } from "@/types/employees/employees.common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useToast } from "../use-toast";

export const usePostEmployee = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation<Employee, Error, newEmployee>({
    mutationFn: (data) => postEmployee(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEmployees"] });
      toast({
        title: t("employeesHooks.createdTitle"),
        description: t("employeesHooks.createdDesc"),
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Error creating employee:", error);
      toast({
        title: t("employeesHooks.createErrorTitle"),
        description: t("employeesHooks.createErrorDesc"),
        variant: "destructive",
      });
    },
  });

  return mutation;
};
