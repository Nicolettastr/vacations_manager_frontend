import { createNote } from "@/api/notes/postNote";
import { NoteCreateRequest, NoteResponse } from "@/types/notes/notes.common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useToast } from "../use-toast";

export const usePostNote = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { toast } = useToast();

  const mutation = useMutation<NoteResponse, Error, NoteCreateRequest>({
    mutationFn: (data) => createNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getNotes"] });
      toast({
        title: t("notesHook.createdTitle"),
        description: t("notesHook.createdDesc"),
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Note creation failed", error);
      toast({
        title: t("notesHook.createErrorTitle"),
        description: t("notesHook.createErrorDesc"),
        variant: "destructive",
      });
    },
  });

  return mutation;
};
