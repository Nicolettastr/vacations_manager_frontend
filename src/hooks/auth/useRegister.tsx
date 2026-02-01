import { registerUser } from "@/api/auth/register";
import { RegisterResponse, userParams } from "@/types/auth/auth.common";
import { useMutation } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
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
  >,
) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const mutation = useMutation<RegisterResponse, Error, userParams>({
    mutationFn: (data) => registerUser(data),
    onSuccess: (data) => {
      toast({
        title: t("registeredSuccessfully"),
        description: data.message,
        variant: "success",
      });
      handleRegisterModal(true);
      form.reset();
    },
    onError: (data) => {
      toast({
        title: t("registeredUnsuccessful"),
        description: data.message,
        variant: "destructive",
      });
    },
  });

  return mutation;
};
