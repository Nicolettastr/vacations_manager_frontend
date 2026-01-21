import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  userConfiguration: boolean;
  setUserConfiguration: (userConfiguration: boolean) => void;
  changeEmail: boolean;
  setChangeEmail: (changeEmail: boolean) => void;
}
export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userConfiguration: false,
      setUserConfiguration: (userConfiguration: boolean) =>
        set({ userConfiguration }),
      changeEmail: false,
      setChangeEmail: (changeEmail) => set({ changeEmail }),
    }),
    { name: "user-configuration-storage" },
  ),
);
