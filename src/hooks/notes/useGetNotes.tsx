import { getNotes } from "@/api/notes/getNotes";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";

export const useGetNotes = (isLoggedIn: boolean) => {
  const token = useAuthStore((state) => state.token);

  const { data, isFetching } = useQuery({
    queryKey: ["getNotes", token],
    queryFn: () => getNotes(token),
    enabled: isLoggedIn && !!token,
  });

  return {
    notes: data ?? [],
    notesFetching: isFetching,
  };
};
