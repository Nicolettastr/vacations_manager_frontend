import { getNoteTypes } from "@/api/notes/getNoteTypes";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";

export const useGetNotesTypes = (isLoggedIn: boolean) => {
  const token = useAuthStore((state) => state.token);

  const { data, isFetching } = useQuery({
    queryKey: ["getNoteTypes", token],
    queryFn: () => getNoteTypes(token),
    enabled: isLoggedIn && !!token,
  });

  return {
    notestypes: data ?? [],
    fetchingNotesTypes: isFetching,
  };
};
