"use client";

import type { RefObject } from "react";
import { ThemeGlobe } from "@/components/theme/ThemeGlobe";
import { themeOrder, themes, type ThemeId } from "@/data/themes";

type ThemeGlobeSelectorProps = {
  currentThemeId: ThemeId;
  firstButtonRef: RefObject<HTMLButtonElement | null>;
  reducedMotion: boolean;
  onSelect: (themeId: ThemeId) => void;
};

export function ThemeGlobeSelector({ currentThemeId, firstButtonRef, reducedMotion, onSelect }: ThemeGlobeSelectorProps) {
  return (
    <div className="theme-globe-grid">
      {themeOrder.map((themeId, index) => {
        const theme = themes[themeId];

        return (
          <ThemeGlobe
            key={theme.id}
            ref={index === 0 ? firstButtonRef : undefined}
            theme={theme}
            selected={currentThemeId === theme.id}
            index={index}
            reducedMotion={reducedMotion}
            onSelect={onSelect}
          />
        );
      })}
    </div>
  );
}
