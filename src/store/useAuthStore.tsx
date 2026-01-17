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
  logout: (resetAll: () => void) => void;
  forgotPassword: boolean;
  setForgotPassword: (forgotPassword: boolean) => void;
  resetState: () => void;
  previewTheme: string | null;
  setPreviewTheme: (t: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
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

      logout: (resetAll) => {
        get().resetState();
        resetAll();
        localStorage.removeItem("token");
      },

      forgotPassword: false,
      setForgotPassword: (forgotPassword) => set({ forgotPassword }),

      previewTheme: null,
      setPreviewTheme: (previewTheme) => set({ previewTheme }),

      resetState: () =>
        set({
          user: null,
          token: null,
          isLoggedIn: false,
          forgotPassword: false,
        }),
    }),
    { name: "auth-storage" }
  )
);
