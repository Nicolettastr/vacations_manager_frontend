import { loginUser } from "@/api/auth/login";
import { useAuthStore } from "@/store/useAuthStore";
import { Login, userParams } from "@/types/auth/auth.common";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useToast } from "../use-toast";

export const useLogin = () => {
  const login = useAuthStore((state) => state.login);
  const { toast } = useToast();
  const { t } = useTranslation();

  const mutation = useMutation<Login, Error, userParams>({
    mutationFn: (data) => loginUser(data),
    onSuccess: (data) => {
      const { user, token } = data;
      login(user, token);
      toast({
        title: t("signInButton"),
        description: t("signInSuccess"),
        variant: "success",
      });
    },
    onError: (error: any) => {
      let errorMessage;

      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }

      toast({
        title: t("signInButton"),
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  return mutation;
};
