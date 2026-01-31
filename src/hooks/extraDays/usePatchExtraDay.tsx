import { editExtraDay } from "@/api/extraDays/patchExtraDay";
import {
  ExtraDayBase,
  ExtraDayWithEmployee,
} from "@/types/extraDays/extraDays.common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";

export const usePatchExtraDay = () => {
  const queryClient = useQueryClient();
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
        title: "Extra day edited",
        description: "The employee extra day has been successfully edited.",
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Extra day edition failed", error);
      toast({
        title: "Extra day edition failed",
        description: "The employee extra day edition has failed.",
        variant: "destructive",
      });
    },
  });

  return mutation;
};
