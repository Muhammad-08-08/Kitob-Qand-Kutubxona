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
      const savedDarkMode = localStorage.getItem("isDarkMode");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const initialMode = savedDarkMode
        ? JSON.parse(savedDarkMode)
        : prefersDark;

      set({ isDarkMode: initialMode });

      if (initialMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  },

  toggleDarkMode: () => {
    set((state) => {
      const newDarkMode = !state.isDarkMode;
      localStorage.setItem("isDarkMode", JSON.stringify(newDarkMode));

      if (newDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      return { isDarkMode: newDarkMode };
    });
  },
}));

export default useMyStore;
