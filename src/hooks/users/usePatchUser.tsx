import { editUser } from "@/api/users/editUser";
import { User } from "@/types/auth/auth.common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";

export const usePatchUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (data: User) => editUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
      toast({
        title: "User edited",
        description: "The user has been successfully edited.",
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("User creation failed", error);
      toast({
        title: "User edition failed",
        description: "The user edition has failed.",
        variant: "destructive",
      });
    },
  });

  return mutation;
};
