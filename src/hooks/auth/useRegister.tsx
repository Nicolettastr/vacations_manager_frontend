import { registerUser } from "@/api/auth/register";
import { Register, userParams } from "@/types/auth/auth.common";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../use-toast";

export const useRegister = () => {
  const { toast } = useToast();
  const mutation = useMutation<Register, Error, userParams>({
    mutationFn: (data) => registerUser(data),
    onSuccess: (data) => {
      const { user } = data;
      toast({
        title: `Registered successfully`,
        description: `${user} has been registered successfully`,
        variant: "success",
      });
    },
  });

  return mutation;
};
