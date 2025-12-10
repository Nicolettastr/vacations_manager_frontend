import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CommonDataStore {
  selectedDate: string;
  setSelectedDate: (selectedDate: string) => void;
  windowWidth: number;
  setWindowWidth: (width: number) => void;
}
export const useCommonDataStore = create<CommonDataStore>()(
  persist(
    (set) => ({
      selectedDate: "",
      setSelectedDate: (selectedDate) => set({ selectedDate }),
      windowWidth: typeof window !== "undefined" ? window.innerWidth : 1024,
      setWindowWidth: (width) => set({ windowWidth: width }),
    }),
    { name: "common-data-storage" }
  )
);
