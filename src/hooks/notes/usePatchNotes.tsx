import { editNote } from "@/api/notes/patchNote";
import { NoteCreateRequest, NoteResponse } from "@/types/notes/notes.common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";

export const usePatchNotes = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation<NoteResponse, Error, NoteCreateRequest>({
    mutationFn: (data) => editNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getNotes"] });
      toast({
        title: "Note edited",
        description: "The note has been successfully edited.",
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Note creation failed", error);
      toast({
        title: "Note edition failed",
        description: "The note edition has failed.",
        variant: "destructive",
      });
    },
  });

  return mutation;
};
