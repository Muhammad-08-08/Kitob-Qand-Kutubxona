import { create } from "zustand";

interface MyStore {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  initDarkMode: () => void;
}

const useMyStore = create<MyStore>((set) => ({
  isDarkMode: false,

  initDarkMode: () => {
    if (typeof window !== "undefined") {
      const savedDarkMode = JSON.parse(
        localStorage.getItem("isDarkMode") || "false"
      );
      set({ isDarkMode: savedDarkMode });
    }
  },

  toggleDarkMode: () => {
    set((state) => {
      const newDarkMode = !state.isDarkMode;
      if (typeof window !== "undefined") {
        localStorage.setItem("isDarkMode", JSON.stringify(newDarkMode));
      }
      return { isDarkMode: newDarkMode };
    });
  },
}));

export default useMyStore;
