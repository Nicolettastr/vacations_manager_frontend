import { deleteNote } from "@/api/notes/deleteNote";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useToast } from "../use-toast";

export const useDeleteNotes = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getNotes"] });
      toast({
        title: t("notesHook.deletedTitle"),
        description: t("notesHook.deletedDesc"),
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Error deleting note:", error);
      toast({
        title: t("notesHook.deleteErrorTitle"),
        description: t("notesHook.deleteErrorDesc"),
        variant: "destructive",
      });
    },
  });

  return mutation;
};
