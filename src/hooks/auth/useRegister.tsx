import { registerUser } from "@/api/auth/register";
import { RegisterResponse, userParams } from "@/types/auth/auth.common";
import { useMutation } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { useToast } from "../use-toast";

export const useRegister = (
  handleRegisterModal: (register: boolean) => void,
  form: UseFormReturn<
    {
      email: string;
      password: string;
      name?: unknown;
      lastname?: unknown;
    },
    any,
    {
      email: string;
      password: string;
      name?: unknown;
      lastname?: unknown;
    }
  >
) => {
  const { toast } = useToast();
  const mutation = useMutation<RegisterResponse, Error, userParams>({
    mutationFn: (data) => registerUser(data),
    onSuccess: (data) => {
      toast({
        title: `Registered successfully`,
        description: data.message,
        variant: "success",
      });
      handleRegisterModal(true);
      form.reset();
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
