"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";
import { MiniWorldGlobe } from "@/components/theme/MiniWorldGlobe";
import type { ThemeConfig } from "@/data/themes";

type ThemeGlobeProps = {
  theme: ThemeConfig;
  selected: boolean;
  index: number;
  reducedMotion: boolean;
  onSelect: (themeId: ThemeConfig["id"]) => void;
};

export const ThemeGlobe = forwardRef<HTMLButtonElement, ThemeGlobeProps>(function ThemeGlobe(
  { theme, selected, index, reducedMotion, onSelect },
  ref
) {
  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={() => onSelect(theme.id)}
      className={selected ? "theme-globe-card theme-globe-card--active" : "theme-globe-card"}
      aria-label={`Enter ${theme.name} journey`}
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.045, ease: "easeOut" }}
    >
      <MiniWorldGlobe theme={theme} reducedMotion={reducedMotion} />
      <span className="theme-globe-card__content">
        <span className="theme-globe-card__name">{theme.name}</span>
        <span className="theme-globe-card__description">{theme.description}</span>
        <span className="theme-globe-card__cta">Enter Journey</span>
      </span>
    </motion.button>
  );
});
