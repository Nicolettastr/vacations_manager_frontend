import { loginUser } from "@/api/auth/login";
import { useAuthStore } from "@/store/useAuthStore";
import { Login, userParams } from "@/types/auth/auth.common";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const login = useAuthStore((state) => state.login);

  const mutation = useMutation<Login, Error, userParams>({
    mutationFn: (data) => loginUser(data),
    onSuccess: (data) => {
      const { user, token } = data;
      login(user, token);
    },
  });

  return mutation;
};
