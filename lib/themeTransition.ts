import { themes, type ThemeConfig, type ThemeId } from "@/data/themes";

export type ActiveThemeTransition = {
  id: string;
  fromTheme: ThemeConfig;
  toTheme: ThemeConfig;
  durationMs: number;
};

export function createThemeTransition(fromThemeId: ThemeId, toThemeId: ThemeId): ActiveThemeTransition {
  const toTheme = themes[toThemeId];

  return {
    id: `${fromThemeId}-${toThemeId}-${Date.now()}`,
    fromTheme: themes[fromThemeId],
    toTheme,
    durationMs: toTheme.portalTransition.durationMs
  };
}

export function transitionCommitDelay(durationMs: number, prefersReducedMotion: boolean) {
  return prefersReducedMotion ? 120 : Math.round(durationMs * 0.46);
}

export function transitionEndDelay(durationMs: number, prefersReducedMotion: boolean) {
  return prefersReducedMotion ? 460 : durationMs;
}
