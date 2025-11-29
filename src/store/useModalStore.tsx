import { ModalState } from "@/types/global";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ModalStore {
  modalState: ModalState;
  setModalState: <T extends ModalState>(state: T) => void;
  clearModal: () => void;
}

const INIT_MODAL_STATE: ModalState = { isOpen: false, mode: "create" };

export const useModalStore = create<ModalStore>()(
  persist(
    (set) => ({
      modalState: INIT_MODAL_STATE,
      setModalState: (newState) =>
        set((state) => ({
          modalState: { ...state.modalState, ...newState },
        })),
      clearModal: () => set({ modalState: INIT_MODAL_STATE }),
    }),
    { name: "modal-storage" }
  )
);
