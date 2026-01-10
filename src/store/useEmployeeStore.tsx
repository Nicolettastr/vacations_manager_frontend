import { ModalState } from "@/types/global";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface EmployeeStore {
  configureEmployees: boolean;
  setConfigureEmployees: (configure: boolean) => void;
  modalState: ModalState;
  setModalState: <T extends ModalState>(state: T) => void;
  employeesSettingsMobileIcon: boolean;
  setEmployeesSettingsMobileIcon: (settings: boolean) => void;
  resetStore: () => void;
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
      employeesSettingsMobileIcon: false,
      setEmployeesSettingsMobileIcon: (settings) =>
        set(() => ({ employeesSettingsMobileIcon: settings })),
      resetStore: () =>
        set({
          configureEmployees: false,
          modalState: { isOpen: false, mode: "create" },
          employeesSettingsMobileIcon: false,
        }),
    }),
    { name: "employee-storage" }
  )
);
