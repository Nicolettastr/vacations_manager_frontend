import { editExtraDay } from "@/api/extraDays/patchExtraDay";
import {
  ExtraDayBase,
  ExtraDayWithEmployee,
} from "@/types/extraDays/extraDays.common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useToast } from "../use-toast";

export const usePatchExtraDay = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { toast } = useToast();

  const mutation = useMutation<
    ExtraDayWithEmployee,
    Error,
    ExtraDayBase & { id: string }
  >({
    mutationFn: (data) => editExtraDay(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getExtraDays"] });
      toast({
        title: t("extraDayHook.editedTitle"),
        description: t("extraDayHook.editedDesc"),
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Extra day edition failed", error);
      toast({
        title: t("extraDayHook.editErrorTitle"),
        description: t("extraDayHook.editErrorDesc"),
        variant: "destructive",
      });
    },
  });

  return mutation;
};
