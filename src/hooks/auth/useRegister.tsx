import { registerUser } from "@/api/auth/register";
import { Register, userParams } from "@/types/auth/auth.common";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  const mutation = useMutation<Register, Error, userParams>({
    mutationFn: (data) => registerUser(data),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return mutation;
};
