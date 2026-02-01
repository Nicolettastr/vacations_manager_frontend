import { editNote } from "@/api/notes/patchNote";
import { NoteCreateRequest, NoteResponse } from "@/types/notes/notes.common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useToast } from "../use-toast";

export const usePatchNotes = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t } = useTranslation();

  const mutation = useMutation<NoteResponse, Error, NoteCreateRequest>({
    mutationFn: (data) => editNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getNotes"] });
      toast({
        title: t("notesHook.editedTitle"),
        description: t("notesHook.editedDesc"),
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Note creation failed", error);
      toast({
        title: t("notesHook.editErrorTitle"),
        description: t("notesHook.editErrorDesc"),
        variant: "destructive",
      });
    },
  });

  return mutation;
};
