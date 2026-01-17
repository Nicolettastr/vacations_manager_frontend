"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export const ThemeSwitcher = () => {
  const [theme, previewTheme, setPreviewTheme] = useAuthStore(
    useShallow((state) => [
      state.user?.theme,
      state.previewTheme,
      state.setPreviewTheme,
    ])
  );

  const effectiveTheme = previewTheme ?? theme;

  useEffect(() => {
    if (!effectiveTheme) return;
    document.documentElement.setAttribute("data-theme", effectiveTheme);
  }, [effectiveTheme]);

  useEffect(() => {
    if (previewTheme && theme === previewTheme) {
      setPreviewTheme(null);
    }
  }, [theme, previewTheme]);

  return null;
};
