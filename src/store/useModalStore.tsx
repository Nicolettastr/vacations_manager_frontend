import { ModalState } from "@/types/global";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ModalStore {
  modalState: ModalState;
  setModalState: <T extends ModalState>(state: T) => void;
}
export const useModalStore = create<ModalStore>()(
  persist(
    (set) => ({
      modalState: { isOpen: false, mode: "create" },
      setModalState: (newState) =>
        set((state) => ({
          modalState: { ...state.modalState, ...newState },
        })),
    }),
    { name: "auth-storage" }
  )
);
