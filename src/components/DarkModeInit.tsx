"use client";

import { useEffect } from "react";
import useMyStore from "@/store/my-store";

/**
 * Client component that initializes dark mode on app load
 * Must be included in the root layout to prevent flickering
 */
export default function DarkModeInit() {
  const initDarkMode = useMyStore((state) => state.initDarkMode);

  useEffect(() => {
    initDarkMode();
  }, [initDarkMode]);

  return null;
}
