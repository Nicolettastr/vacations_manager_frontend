import { createExtraDay } from "@/api/extraDays/postExtraDay";
import {
  ExtraDayBase,
  ExtraDayWithEmployee,
} from "@/types/extraDays/extraDays.common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";

export const usePostExtraDay = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation<ExtraDayWithEmployee, Error, ExtraDayBase>({
    mutationFn: (data) => createExtraDay(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getExtraDays"] });
      toast({
        title: "Extra day created",
        description: "The employee extra day has been successfully created.",
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Extra day creation failed", error);
      toast({
        title: "Extra day created failed",
        description: "The employee Extra day creation has failed.",
        variant: "destructive",
      });
    },
  });

  return mutation;
};
