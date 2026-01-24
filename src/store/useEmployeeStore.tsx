import { Employee } from "@/types/employees/employees.common";
import { ModalState } from "@/types/global";
import { create } from "zustand";

interface EmployeeStore {
  configureEmployees: boolean;
  setConfigureEmployees: (configure: boolean) => void;
  modalState: ModalState;
  setModalState: <T extends ModalState>(state: T) => void;
  employeesSettingsMobileIcon: boolean;
  setEmployeesSettingsMobileIcon: (settings: boolean) => void;
  resetStore: () => void;
  selectedEmployee: Employee | null;
  setSelectedEmployee: (employee: Employee | null) => void;
}

export const useEmployeeStore = create<EmployeeStore>()((set) => ({
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
  selectedEmployee: null,
  setSelectedEmployee: (selectedEmployee) => set({ selectedEmployee }),
  resetStore: () =>
    set({
      configureEmployees: false,
      modalState: { isOpen: false, mode: "create" },
      employeesSettingsMobileIcon: false,
      selectedEmployee: null,
    }),
}));
