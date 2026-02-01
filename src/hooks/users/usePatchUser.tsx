import { editUser } from "@/api/users/editUser";
import { User } from "@/types/auth/auth.common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useToast } from "../use-toast";

export const usePatchUser = (handleResetForm: () => void) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t } = useTranslation();

  const mutation = useMutation({
    mutationFn: (data: User) => editUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
      toast({
        title: t("usersHook.editedTitle"),
        description: t("usersHook.editedDesc"),
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("User edition failed", error);
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
      toast({
        title: t("usersHook.editErrorTitle"),
        description: t("usersHook.editErrorDesc"),
        variant: "destructive",
      });
      handleResetForm();
    },
  });

  return mutation;
};
