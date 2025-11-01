import { User } from "@/types/auth/auth.common";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  isLoggedIn: boolean;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
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

      login: (user, token) => {
        set({ user, token, isLoggedIn: true });
        localStorage.setItem("token", token);
      },

      logout: () => {
        set({ user: null, token: null, isLoggedIn: false });
        localStorage.removeItem("token");
      },
    }),
    { name: "auth-storage" }
  )
);
