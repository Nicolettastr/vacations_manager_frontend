import { create } from "zustand";

interface UserStore {
  userConfiguration: boolean;
  setUserConfiguration: (userConfiguration: boolean) => void;
  changeEmail: boolean;
  setChangeEmail: (changeEmail: boolean) => void;
}
export const useUserStore = create<UserStore>()((set) => ({
  userConfiguration: false,
  setUserConfiguration: (userConfiguration: boolean) =>
    set({ userConfiguration }),
  changeEmail: false,
  setChangeEmail: (changeEmail) => set({ changeEmail }),
}));
