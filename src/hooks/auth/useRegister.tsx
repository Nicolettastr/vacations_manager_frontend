import { registerUser } from "@/api/auth/register";
import { RegisterResponse, userParams } from "@/types/auth/auth.common";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../use-toast";

export const useRegister = () => {
  const { toast } = useToast();
  const mutation = useMutation<RegisterResponse, Error, userParams>({
    mutationFn: (data) => registerUser(data),
    onSuccess: (data) => {
      toast({
        title: `Registered successfully`,
        description: data.message,
        variant: "success",
      });
    },
    onError: (data) => {
      toast({
        title: `Registered unsuccessfull`,
        description: data.message,
        variant: "destructive",
      });
    },
  });

  return mutation;
};
