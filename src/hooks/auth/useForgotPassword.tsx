import { forgotPassword } from "@/api/auth/forgotPassword";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useToast } from "../use-toast";

export const useForgotPassword = () => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const mutation = useMutation({
    mutationFn: (email: string) => forgotPassword(email),

    onSuccess: () => {
      toast({
        title: t("forgotPasswordSend"),
        description: t("forgotPasswordMail"),
        variant: "success",
      });
    },

    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.error || "Something went wrong.";

      toast({
        title: t("forgotPasswordSendError"),
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  return mutation;
};
