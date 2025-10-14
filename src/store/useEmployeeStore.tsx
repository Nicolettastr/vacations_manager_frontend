import { ModalState } from "@/types/global";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface EmployeeStore {
  configureEmployees: boolean;
  setConfigureEmployees: (configure: boolean) => void;
  modalState: ModalState;
  setModalState: <T extends ModalState>(state: T) => void;
}
export const useEmployeeStore = create<EmployeeStore>()(
  persist(
    (set) => ({
      configureEmployees: false,
      setConfigureEmployees: (configure) =>
        set(() => ({ configureEmployees: configure })),
      modalState: { isOpen: false, mode: "create" },
      setModalState: (newState) =>
        set((state) => ({
          modalState: { ...state.modalState, ...newState },
        })),
    }),
    { name: "employee-storage" }
  )
);
