import { editUserEmail } from "@/api/users/editUserEmail";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";

export const usePatchUserEmail = (
  handleResetForm: () => void,
  logout: () => void
) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (email: string) => editUserEmail(email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
      toast({
        title: "User email edited",
        description: "The user email has been successfully edited.",
        variant: "success",
      });
      logout();
    },
    onError: (error) => {
      console.error("User email edition failed", error);
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
      toast({
        title: "User email edition failed",
        description: "The user email edition has failed.",
        variant: "destructive",
      });
      handleResetForm();
    },
  });

  return mutation;
};
