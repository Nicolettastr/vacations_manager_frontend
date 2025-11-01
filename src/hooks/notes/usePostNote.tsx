import { createNote } from "@/api/notes/postNote";
import { NoteCreateRequest, NoteResponse } from "@/types/notes/notes.common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";

export const usePostNote = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation<NoteResponse, Error, NoteCreateRequest>({
    mutationFn: (data) => createNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getNotes"] });
      toast({
        title: "Note created",
        description: "The note has been successfully created.",
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Note creation failed", error);
      toast({
        title: "Note creation failed",
        description: "The note creation has failed.",
        variant: "destructive",
      });
    },
  });

  return mutation;
};
