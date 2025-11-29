import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CommonDataStore {
  selectedDate: string;
  setSelectedDate: (selectedDate: string) => void;
}
export const useCommonDataStore = create<CommonDataStore>()(
  persist(
    (set) => ({
      selectedDate: "",
      setSelectedDate: (selectedDate) => set({ selectedDate }),
    }),
    { name: "common-data-storage" }
  )
);
