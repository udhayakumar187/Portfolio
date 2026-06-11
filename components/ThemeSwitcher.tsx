"use client";

import { Palette } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeSwitcher() {
  const { hasSelectedTheme, openThemeSelector, theme } = useTheme();

  if (!hasSelectedTheme) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={openThemeSelector}
      className="fixed bottom-4 right-4 z-50 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/15 bg-ink/74 px-4 text-sm font-semibold text-white shadow-soft-glow backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-electric/60 hover:bg-electric/10"
      aria-label={`Change theme. Current theme is ${theme.name}.`}
    >
      <Palette className="h-4 w-4" aria-hidden="true" />
      <span className="hidden sm:inline">Change Theme</span>
      <span className="sm:hidden">Theme</span>
    </button>
  );
}
