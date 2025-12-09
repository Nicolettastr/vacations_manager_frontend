import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  userConfiguration: boolean;
  setUserConfiguration: (userConfiguration: boolean) => void;
}
export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userConfiguration: false,
      setUserConfiguration: (userConfiguration: boolean) =>
        set({ userConfiguration }),
    }),
    { name: "user-configuration-storage" }
  )
);
