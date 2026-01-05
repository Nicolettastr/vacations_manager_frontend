"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

export const ThemeSwitcher = () => {
  const theme = useAuthStore((state) => state.user?.theme);

  useEffect(() => {
    if (!theme) return;
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return null;
};
