import { deleteExtraDay } from "@/api/extraDays/deleteExtraDay";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useToast } from "../use-toast";

export const useDeleteExtraDay = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteExtraDay(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEmployees"] });
      queryClient.invalidateQueries({ queryKey: ["getExtraDays"] });

      toast({
        title: t("extraDayHook.deletedTitle"),
        description: t("extraDayHook.deletedDesc"),
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Error deleting employee extra day:", error);
      toast({
        title: t("extraDayHook.deleteErrorTitle"),
        description: t("extraDayHook.deleteErrorDesc"),
        variant: "destructive",
      });
    },
  });

  return mutation;
};
