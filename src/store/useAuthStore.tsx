import { User } from "@/types/auth/auth.common";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null | undefined;
  setUser: (user: User) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  isLoggedIn: boolean;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  login: (token: string) => void;
  logout: () => void;
  forgotPassword: boolean;
  setForgotPassword: (forgotPassword: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      isLoading: true,
      setIsLoading: (isLoading) => set({ isLoading }),
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),

      login: (token) => {
        set({ token, isLoggedIn: true, forgotPassword: false });
        localStorage.setItem("token", token);
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isLoggedIn: false,
          forgotPassword: false,
        });
        localStorage.removeItem("token");
      },

      forgotPassword: false,
      setForgotPassword: (forgotPassword) => set({ forgotPassword }),
    }),
    { name: "auth-storage" }
  )
);
