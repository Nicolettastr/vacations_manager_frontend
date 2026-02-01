import { resetPassword } from "@/api/auth/resetPassword";
import { IResetPassword } from "@/types/auth/auth.common";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useToast } from "../use-toast";

export const useResetPassword = () => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const mutation = useMutation({
    mutationFn: (body: IResetPassword) => resetPassword(body),

    onSuccess: () => {
      toast({
        title: t("resetPassword"),
        description: t("passwordChangedCorrectly"),
        variant: "success",
      });
    },

    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || t("somethingWrong");

      toast({
        title: t("resetPassword"),
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  return mutation;
};
