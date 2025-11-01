import { deleteNote } from "@/api/notes/deleteNote";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";

export const useDeleteNotes = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getNotes"] });
      toast({
        title: "Note deleted",
        description: "The note has been successfully deleted.",
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Error deleting note:", error);
      toast({
        title: "Note deletion Failed",
        description: "There was an error deleting the note.",
        variant: "destructive",
      });
    },
  });

  return mutation;
};
