import { deleteExtraDay } from "@/api/extraDays/deleteExtraDay";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";

export const useDeleteExtraDay = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteExtraDay(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEmployees"] });
      queryClient.invalidateQueries({ queryKey: ["getExtraDays"] });

      toast({
        title: "Extra day deleted",
        description: "The employee extra day has been successfully deleted.",
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Error deleting employee extra day:", error);
      toast({
        title: "Employee extra day deletion Failed",
        description: "There was an error deleting the employee extra day.",
        variant: "destructive",
      });
    },
  });

  return mutation;
};
