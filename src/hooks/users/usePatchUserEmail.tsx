import { editUserEmail } from "@/api/users/editUserEmail";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useToast } from "../use-toast";

export const usePatchUserEmail = (
  handleResetForm: () => void,
  logout: () => void,
) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t } = useTranslation();

  const mutation = useMutation({
    mutationFn: (email: string) => editUserEmail(email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
      toast({
        title: t("usersHook.emailEditedTitle"),
        description: t("usersHook.emailEditedDesc"),
        variant: "success",
      });
      logout();
    },
    onError: (error) => {
      console.error("User email edition failed", error);
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
      toast({
        title: t("usersHook.emailEditErrorTitle"),
        description: t("usersHook.emailEditErrorDesc"),
        variant: "destructive",
      });
      handleResetForm();
    },
  });

  return mutation;
};
