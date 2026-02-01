import { createExtraDay } from "@/api/extraDays/postExtraDay";
import {
  ExtraDayBase,
  ExtraDayWithEmployee,
} from "@/types/extraDays/extraDays.common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useToast } from "../use-toast";

export const usePostExtraDay = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { toast } = useToast();

  const mutation = useMutation<ExtraDayWithEmployee, Error, ExtraDayBase>({
    mutationFn: (data) => createExtraDay(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getExtraDays"] });
      toast({
        title: t("extraDayHook.createdTitle"),
        description: t("extraDayHook.createdDesc"),
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Extra day creation failed", error);
      toast({
        title: t("extraDayHook.createErrorTitle"),
        description: t("extraDayHook.createErrorDesc"),
        variant: "destructive",
      });
    },
  });

  return mutation;
};
