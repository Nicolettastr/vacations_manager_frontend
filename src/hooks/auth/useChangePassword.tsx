import { changePassword } from "@/api/auth/changePassword";
import { IChangePassword } from "@/types/auth/auth.common";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useToast } from "../use-toast";

export const useChangePassword = (handleLogout: () => void) => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const mutation = useMutation({
    mutationFn: (body: IChangePassword) => changePassword(body),

    onSuccess: () => {
      toast({
        title: t("changePassword"),
        description: t("passwordChangedCorrectly"),
        variant: "success",
      });
      handleLogout();
    },

    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.error || "Something went wrong.";

      toast({
        title: t("changePassword"),
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  return mutation;
};
